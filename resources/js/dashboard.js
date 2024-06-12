// Firebase Configuration
var firebaseConfig = {
    apiKey: "AIzaSyBVp7fPtdxfkmbpDMaQ9h1LMjRLz_Dua94",
    authDomain: "voting-database-79b70.firebaseapp.com",
    projectId: "voting-database-79b70",
    storageBucket: "voting-database-79b70.appspot.com",
    messagingSenderId: "617270993047",
    appId: "1:617270993047:web:a20e9de811a7a3734e89d2",
    measurementId: "G-97YTPFC176"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Vue Object Initialization
var vm = new Vue({
    el: '#app',
    data: {
        invoiceData: [],
        invoice: {
            No: null,
            Date: '',
            HeadName: '',
            Address: '',
            District: '',
            PinCode: '',
            PlaceOfSupply: '',
            RONo: '',
            RODate: '',
            ProductName: '',
            KeyNo: '',
            Caption: '',
            GSTIN: '',
            SizeWidth: null,
            SizeHeight: null,
            AreaOfEdition: '',
            PagePosition: '',
            Rate: null,
            InitialTotal: null,
            Discount: null,
            DiscountTotal: null,
            interMediateTotal: null,
            GST: null,
            NetTotal: null
        },

        currentPage: 1,
        rowsPerPage: 10,

        selectedDate: '',
        selectedStartDate: moment().format('MMMM D, YYYY'), // Default start date to today
        selectedEndDate: moment().format('MMMM D, YYYY'), // Default end date to today

        tableData: [],
        currentTab: 'Tab 1'
    },
    computed: {
        totalPages() {
            return Math.ceil(this.tableData.length / this.rowsPerPage);
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.rowsPerPage;
            return this.tableData.slice(start, start + this.rowsPerPage);
        },
        visiblePages() {
            let pages = [];
            if (this.totalPages <= 3) {
                for (let i = 1; i <= this.totalPages; i++) {
                    pages.push(i);
                }
            } else if (this.currentPage === 1) {
                pages = [1, 2, 3];
            } else if (this.currentPage === this.totalPages) {
                pages = [this.totalPages - 2, this.totalPages - 1, this.totalPages];
            } else {
                pages = [this.currentPage - 1, this.currentPage, this.currentPage + 1];
            }
            return pages;
        }
    },
    methods: {
        readInvoiceData() {
            var notyf = new Notyf();

            database.ref('invoiceData').once('value').then((snapshot) => {
                if (snapshot.exists()) {
                    let invoices = snapshot.val();
                    this.tableData = Object.keys(invoices).map(key => invoices[key]);
                }
            }).catch((error) => {
                notyf.error('Failed to retrieve invoices');
                console.error(error);
            });
        },
        calculateInvoiceData() {
            this.invoice.interMediateTotal = this.invoice.SizeWidth * this.invoice.SizeHeight * this.invoice.Rate;
            this.invoice.DiscountTotal = this.invoice.interMediateTotal * (this.invoice.Discount / 100);
            this.invoice.initialTotal = this.invoice.interMediateTotal - this.invoice.DiscountTotal;

            this.invoice.GST = this.invoice.initialTotal * (this.invoice.GST / 100);

            this.invoice.NetTotal = parseInt(this.invoice.initialTotal) + parseInt(this.invoice.GST);
        },
        addInvoiceData() {
            this.calculateInvoiceData();
            this.invoiceData.push({ ...this.invoice });
            this.clearAddFormData();
            this.closeModal();
        },
        saveInvoiceData() {
            var notyf = new Notyf();
            var updates = {};
            var primaryKey = this.tableData.length;  // Initialize primary key for auto-increment

            this.invoiceData.forEach((invoice, index) => {
                var newInvoiceKey = primaryKey++;
                invoice.id = newInvoiceKey;
                updates['/invoiceData/' + newInvoiceKey] = invoice;
            });

            database.ref().update(updates)
                .then(() => {
                    notyf.success('All invoices have been saved successfully');
                })
                .catch((error) => {
                    notyf.error('Failed to save invoices');
                    console.error(error);
                });
        },

        clearAddFormData() {
            this.invoice.No = null;
            this.invoice.Date = '';
            this.invoice.HeadName = '';
            this.invoice.Address = '';
            this.invoice.District = '';
            this.invoice.PinCode = '';
            this.invoice.PlaceOfSupply = '';
            this.invoice.RONo = '';
            this.invoice.RODate = '';
            this.invoice.KeyNo = '';
            this.invoice.ProductName = '';
            this.invoice.Caption = '';
            this.invoice.SizeWidth = null;
            this.invoice.SizeHeight = null;
            this.invoice.AreaOfEdition = '';
            this.invoice.PagePosition = '';
            this.invoice.Rate = null;
            this.invoice.InitialTotal = null;
            this.invoice.Discount = null;
            this.invoice.DiscountTotal = null;
            this.invoice.interMediateTotal = null;
            this.invoice.GST = null;
            this.invoice.NetTotal = null;
        },
        openModal() {
            $('#exampleModalCenter').modal('show');
        },
        closeModal() {
            $('#exampleModalCenter').modal('hide');
        },
        switchTab(tab) {
            this.currentTab = tab;
            this.$nextTick(() => {
                this.initializeDatePicker();
                this.initializeSelect2();
            });
        },
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        cb(start, end) {
            this.selectedStartDate = start.format('MMMM D, YYYY');
            this.selectedEndDate = end.format('MMMM D, YYYY');
            this.selectedDate = this.selectedStartDate + ' - ' + this.selectedEndDate;
            $('#dateRangePicker').val(this.selectedDate);
            console.log("Selected date range:", this.selectedDate);
        },
        initializeDatePicker() {
            var start = moment(this.selectedStartDate, 'MMMM D, YYYY');
            var end = moment(this.selectedEndDate, 'MMMM D, YYYY');
            $('#dateRangePicker').daterangepicker({
                startDate: start,
                endDate: end,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            }, this.cb);
            this.cb(start, end);
        },
        initializeSelect2() {
            $('#single').select2({
                placeholder: 'Select a template',
                allowClear: false
            }).on('change', function (e) {
                console.log($(this).val());
            });
        }
    },
    mounted() {
        this.initializeDatePicker();
        this.initializeSelect2();
        this.readInvoiceData();
    }
});

// For Development & Production Code
Vue.config.productionTip = false;
Vue.config.devtools = true;
