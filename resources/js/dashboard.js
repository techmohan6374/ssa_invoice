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

var vm = new Vue({
    el: '#app',
    data: {
        invoiceData: [],
        invoice: {
            No: null,
            Date: '',
            HeadName: '',
            Address: '',
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

        tableData: [
            {
                sNo: 1,
                date: '2024-06-09',
                headName: 'John Doe',
                address: '123 Main St, Anytown',
                pinCode: '123456',
                gstIn: '27AAAPL1234C1Z1',
                placeOfSupply: 'Maharashtra',
                roNo: 'RO001',
                roDate: '2024-06-01',
                productName: 'Advertisement',
                keyNo: '1001',
                captionName: 'Summer Sale',
                size: '40x50',
                areaName: 'Front Page',
                pagePosition: 'AW5',
                ratePerSqcm: '10.00',
                totalAmount: '6000.00',
                discount: '10%',
                gst: '540.00',
                netAmount: '5940.00'
            },
            {
                sNo: 2,
                date: '2024-06-09',
                headName: 'John Doe',
                address: '123 Main St, Anytown',
                pinCode: '123456',
                gstIn: '27AAAPL1234C1Z1',
                placeOfSupply: 'Maharashtra',
                roNo: 'RO001',
                roDate: '2024-06-01',
                productName: 'Advertisement',
                keyNo: '1001',
                captionName: 'Summer Sale',
                size: '40x50',
                areaName: 'Front Page',
                pagePosition: 'AW5',
                ratePerSqcm: '10.00',
                totalAmount: '6000.00',
                discount: '10%',
                gst: '540.00',
                netAmount: '5940.00'
            },
        ],
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
        calculateInvoiceData() {
            this.invoice.interMediateTotal = this.invoice.SizeWidth * this.invoice.SizeHeight * this.invoice.Rate;
            this.invoice.DiscountTotal = this.invoice.interMediateTotal * (this.invoice.Discount / 100);
            this.invoice.initialTotal = this.invoice.interMediateTotal - this.invoice.DiscountTotal;
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
            let promises = [];

            this.invoiceData.forEach((invoice, index) => {
                invoice.No = index + 1;
                promises.push(database.ref('invoiceData/' + invoice.No).set(invoice));
            });

            Promise.all(promises).then(() => {
                notyf.success('All invoices added successfully');
                this.clearAddFormData();
            }).catch((error) => {
                notyf.error('Failed to add invoices');
                console.error(error);
            });
        },
        clearAddFormData() {
            this.invoice.No = null;
            this.invoice.Date = '';
            this.invoice.HeadName = '';
            this.invoice.Address = '';
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
    }
});

// For Development & Production Code
// Vue.config.productionTip = false;
// Vue.config.devtools = true;
