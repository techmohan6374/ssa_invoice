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
        searchText: '',
        selectedDrpFilter: '',
        loaderStatus: false,
        showInvoiceData: [],
        updatedId: null,
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
            GSTAmt: null,
            NetTotal: null
        },
        invoiceTotalData: [],
        amountInWords: '',
        currentPage: 1,
        rowsPerPage: 10,
        selectedDate: '',
        currentTab: 'Tab 1'
    },
    computed: {
        filteredDashboardData() {
            var search = this.searchText.toLowerCase();
            var finalData = Enumerable.from(this.invoiceTotalData).toArray();

            if (this.selectedDrpFilter && this.selectedDrpFilter !== '') {
                finalData = finalData.filter(x => x.HeadName.toLowerCase().includes(this.selectedDrpFilter.toLowerCase()));
            }

            if (this.searchText && this.searchText !== '') {
                finalData = finalData.filter(x =>
                    (x.No && x.No.toString().toLowerCase().includes(search)) ||
                    (x.Address && x.Address.toLowerCase().includes(search)) ||
                    (x.HeadName && x.HeadName.toLowerCase().includes(search)) ||
                    (x.District && x.District.toLowerCase().includes(search)) ||
                    (x.PlaceOfSupply && x.PlaceOfSupply.toLowerCase().includes(search)) ||
                    (x.ProductName && x.ProductName.toLowerCase().includes(search)) ||
                    (x.Caption && x.Caption.toLowerCase().includes(search)) ||
                    (x.NetTotal && x.NetTotal.toString().toLowerCase().includes(search))
                );
            }

            if (this.selectedDate && this.selectedDate !== '') {
                let selectedMoment = moment(this.selectedDate); // Assuming selectedDate is in ISO format
                finalData = finalData.filter(x => moment(x.Date).isSame(selectedMoment, 'day'));
            }

            this.currentPage = 1; // Reset to the first page after filtering
            return finalData;
        },
        totalPages() {
            return Math.ceil(this.filteredDashboardData.length / this.rowsPerPage);
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.rowsPerPage;
            return this.filteredDashboardData.slice(start, start + this.rowsPerPage);
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
        addToInvoie(no) {
            var notyf = new Notyf();

            const item = this.invoiceTotalData.find(row => row.No === no);
            if (item) {
                const itemCopy = { ...item };
                delete itemCopy.id;
                this.invoiceData.push(itemCopy);
                notyf.success('Added successfully');
            }
        },
        readInvoiceData() {
            this.loaderStatus = true;
            var notyf = new Notyf();

            database.ref('invoiceData').once('value').then((snapshot) => {
                if (snapshot.exists()) {
                    let invoices = snapshot.val();
                    this.invoiceTotalData = Object.keys(invoices).map(key => invoices[key]);
                    this.loaderStatus = false;
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

            this.invoice.GSTAmt = this.invoice.GST / 2;
            this.invoice.GST = Math.round(this.invoice.initialTotal * (this.invoice.GSTAmt / 100));

            this.invoice.NetTotal = parseInt(this.invoice.initialTotal) + parseInt(this.invoice.GST) + parseInt(this.invoice.GST);
        },
        addInvoiceData() {
            var notyf = new Notyf();
            this.calculateInvoiceData();
            this.invoiceData.push({ ...this.invoice });
            this.closeaddInvoiceModal();
            this.clearAddFormData();
            notyf.success('Added successfully');
        },
        saveInvoiceData() {
            var updates = {};
            var primaryKey = this.invoiceTotalData.length;  // Initialize primary key for auto-increment

            this.invoiceData.forEach((invoice, index) => {
                var newInvoiceKey = primaryKey++;
                invoice.id = newInvoiceKey;
                updates['/invoiceData/' + newInvoiceKey] = invoice;
            });

            database.ref().update(updates)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'All Invoices Saved Successfully'
                    });
                    this.readInvoiceData();
                })
                .catch((error) => {
                    notyf.error('Failed to save invoices');
                    console.error(error);
                });
        },
        showInvoice(no) {
            let invoice = this.invoiceData.find(invoice => invoice.No === no);

            if (invoice) {
                this.showInvoiceData = { ...invoice };
                console.log(this.showInvoiceData);
            } else {
                this.clearShowFormData();
            }
        },
        deleteInvoice(no) {
            var notyf = new Notyf();
            if (confirm('Are You Sure to Delete ?')) {
                this.invoiceData = this.invoiceData.filter(invoice => invoice.No !== no);
                notyf.error('Deleted successfully');
            }
        },
        UpdateInvoiceData() {
            var notyf = new Notyf();
            let indexToUpdate = this.invoiceData.findIndex(invoice => invoice.No === this.updatedId);
            if (indexToUpdate !== -1) {
                this.invoiceData[indexToUpdate].No = this.invoice.No;
                this.invoiceData[indexToUpdate].Date = this.invoice.Date;
                this.invoiceData[indexToUpdate].HeadName = this.invoice.HeadName;
                this.invoiceData[indexToUpdate].Address = this.invoice.Address;
                this.invoiceData[indexToUpdate].District = this.invoice.District;
                this.invoiceData[indexToUpdate].PinCode = this.invoice.PinCode;
                this.invoiceData[indexToUpdate].PlaceOfSupply = this.invoice.PlaceOfSupply;
                this.invoiceData[indexToUpdate].RONo = this.invoice.RONo;
                this.invoiceData[indexToUpdate].RODate = this.invoice.RODate;
                this.invoiceData[indexToUpdate].ProductName = this.invoice.ProductName;
                this.invoiceData[indexToUpdate].KeyNo = this.invoice.KeyNo;
                this.invoiceData[indexToUpdate].Caption = this.invoice.Caption;
                this.invoiceData[indexToUpdate].GSTIN = this.invoice.GSTIN;
                this.invoiceData[indexToUpdate].SizeWidth = this.invoice.SizeWidth;
                this.invoiceData[indexToUpdate].SizeHeight = this.invoice.SizeHeight;
                this.invoiceData[indexToUpdate].AreaOfEdition = this.invoice.AreaOfEdition;
                this.invoiceData[indexToUpdate].PagePosition = this.invoice.PagePosition;
                this.invoiceData[indexToUpdate].Rate = this.invoice.Rate;
                this.invoiceData[indexToUpdate].InitialTotal = this.invoice.InitialTotal;
                this.invoiceData[indexToUpdate].Discount = this.invoice.Discount;
                this.invoiceData[indexToUpdate].DiscountTotal = this.invoice.DiscountTotal;
                this.invoiceData[indexToUpdate].interMediateTotal = this.invoice.interMediateTotal;
                this.invoiceData[indexToUpdate].GST = this.invoice.GST;
                this.invoiceData[indexToUpdate].NetTotal = this.invoice.NetTotal;
                notyf.success('Updated successfully');
                this.clearAddFormData();
            } else {
                console.error('Invoice not found for updating');
            }
        },
        editInvoice(no) {
            // Find the invoice by its No
            let invoiceToEdit = this.invoiceData.find(invoice => invoice.No === no);

            if (invoiceToEdit) {
                // Populate the invoice object with found data
                this.invoice.No = invoiceToEdit.No;
                this.invoice.Date = moment(invoiceToEdit.Date).format('DD-MM-YYYY');
                this.invoice.HeadName = invoiceToEdit.HeadName;
                this.invoice.Address = invoiceToEdit.Address;
                this.invoice.District = invoiceToEdit.District;
                this.invoice.PinCode = invoiceToEdit.PinCode;
                this.invoice.PlaceOfSupply = invoiceToEdit.PlaceOfSupply;
                this.invoice.RONo = invoiceToEdit.RONo;
                this.invoice.RODate = moment(invoiceToEdit.RODate).format('DD-MM-YYYY');
                this.invoice.KeyNo = invoiceToEdit.KeyNo;
                this.invoice.ProductName = invoiceToEdit.ProductName;
                this.invoice.Caption = invoiceToEdit.Caption;
                this.invoice.SizeWidth = invoiceToEdit.SizeWidth;
                this.invoice.SizeHeight = invoiceToEdit.SizeHeight;
                this.invoice.AreaOfEdition = invoiceToEdit.AreaOfEdition.toUpperCase();
                this.invoice.PagePosition = invoiceToEdit.PagePosition.toUpperCase();
                this.invoice.Rate = invoiceToEdit.Rate + '.00';
                this.invoice.InitialTotal = invoiceToEdit.InitialTotal;
                this.invoice.Discount = invoiceToEdit.Discount;
                this.invoice.DiscountTotal = invoiceToEdit.DiscountTotal;
                this.invoice.interMediateTotal = invoiceToEdit.interMediateTotal + '.00';
                this.invoice.GSTAmt = invoiceToEdit.GSTAmt;
                this.invoice.GST = invoiceToEdit.GST;
                this.invoice.NetTotal = invoiceToEdit.NetTotal;
                this.updatedId = no;
                this.amountInWords = this.convertToWords(invoiceToEdit.NetTotal);
                console.log(this.amountInWords);
                this.goToTab3();
            } else {
                console.error('Invoice not found for editing');
            }
        },

        clearShowFormData() {
            this.showInvoiceData.No = null;
            this.showInvoiceData.Date = moment().format('YYYY-MM-DD');
            this.showInvoiceData.HeadName = '';
            this.showInvoiceData.Address = '';
            this.showInvoiceData.District = '';
            this.showInvoiceData.PinCode = '';
            this.showInvoiceData.PlaceOfSupply = '';
            this.showInvoiceData.RONo = '';
            this.showInvoiceData.RODate = moment().format('YYYY-MM-DD');
            this.showInvoiceData.KeyNo = '';
            this.showInvoiceData.ProductName = '';
            this.showInvoiceData.Caption = '';
            this.showInvoiceData.SizeWidth = null;
            this.showInvoiceData.SizeHeight = null;
            this.showInvoiceData.AreaOfEdition = '';
            this.showInvoiceData.PagePosition = '';
            this.showInvoiceData.Rate = null;
            this.showInvoiceData.InitialTotal = null;
            this.showInvoiceData.Discount = null;
            this.showInvoiceData.DiscountTotal = null;
            this.showInvoiceData.interMediateTotal = null;
            this.showInvoiceData.GST = null;
            this.showInvoiceData.NetTotal = null;
        },
        clearAddFormData() {
            this.invoice.No = null;
            this.invoice.Date = moment().format('YYYY-MM-DD');
            this.invoice.HeadName = '';
            this.invoice.Address = '';
            this.invoice.District = '';
            this.invoice.PinCode = '';
            this.invoice.PlaceOfSupply = '';
            this.invoice.RONo = '';
            this.invoice.RODate = moment().format('YYYY-MM-DD');
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
        convertToWords(amount) {
            var a = ["", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ", "Eleven ", "Twelve ", "Thirteen ",
                "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "];
            var b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",];

            function inWords(num) {
                if ((num = num.toString()).length > 9) return "Overflow";
                var n = ("000000000" + num)
                    .substr(-9)
                    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
                if (!n) return "";
                var str = "";
                str +=
                    n[1] != 0
                        ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) +
                        "Crore "
                        : "";
                str +=
                    n[2] != 0
                        ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh "
                        : "";
                str +=
                    n[3] != 0
                        ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) +
                        "Thousand "
                        : "";
                str +=
                    n[4] != 0
                        ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) +
                        "Hundred "
                        : "";
                str +=
                    n[5] != 0
                        ? (str != "" ? "And " : "") +
                        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]])
                        : "";
                return str.trim();
            }

            return inWords(amount);
        },
        openaddInvoiceModal() {
            $('#addInvoice-Modal').modal('show');
        },
        closeaddInvoiceModal() {
            $('#addInvoice-Modal').modal('hide');
            this.clearAddFormData();
        },
        switchTab(tab) {
            this.currentTab = tab;
            this.$nextTick(() => {
                this.initializeSelect2();
                this.clearAddFormData();
            });
        },
        dashboardReportDownload: async function () {
            var notyf = new Notyf();

            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Sheet1');

            var title = 'SSA Invoice Report';
            worksheet.mergeCells(1, 1, 1, 19);
            worksheet.getCell(1, 1).value = title;
            worksheet.getCell(1, 1).alignment = { horizontal: 'center' };
            worksheet.getCell(1, 1).font = { bold: true, size: 15 };

            const filteredDashboardData = this.filteredDashboardData;

            if (filteredDashboardData.length > 0) {
                const columnOrder = [
                    'No', 'HeadName', 'Address', 'GSTIN', 'PlaceOfSupply',
                    'RONo', 'RODate', 'ProductName', 'KeyNo', 'Caption', 'Date',
                    'SizeHeight', 'SizeWidth', 'AreaOfEdition', 'PagePosition',
                    'Rate', 'Discount', 'GST', 'NetTotal'
                ];

                const reorderedData = filteredDashboardData.map(item => {
                    const reorderedItem = {};
                    columnOrder.forEach(key => {
                        reorderedItem[key] = item[key];
                    });
                    return reorderedItem;
                });

                const headers = columnOrder;
                const headerRow = worksheet.addRow(headers);

                headers.forEach((header, index) => {
                    const cell = worksheet.getCell(2, index + 1);
                    cell.font = { bold: true };
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });

                // Set column widths (adjust as needed)
                const columnWidths = [10, 40, 40, 20, 20, 10, 10, 40, 20, 20, 20, 25, 25, 25, 25];
                columnWidths.forEach((width, index) => {
                    worksheet.getColumn(index + 1).width = width;
                });

                // Set row height based on content
                reorderedData.forEach(data => {
                    const row = worksheet.addRow(Object.values(data));
                    row.eachCell((cell) => {
                        cell.alignment = { horizontal: 'center', vertical: 'middle' };
                        cell.border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' }
                        };
                    });

                    // Calculate the maximum row height needed dynamically
                    const maxHeight = Math.max(...row.values.map(cell => {
                        // Adjust the factor based on your content and font size
                        return (cell && cell.toString().length > 40) ? 40 : 20;
                    }));
                    row.height = maxHeight;
                });
            }

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'SSA_Invoice_Report_List.xlsx';
            link.click();

            notyf.success('Report Download successfully');
            window.URL.revokeObjectURL(blobUrl);
        },
        goToTab3() {
            this.currentTab = 'Tab 3';
        },
        initializeSelect2() {
            $('#single').select2({
                allowClear: true
            }).on('change', (e) => {
                this.selectedDrpFilter = $(e.target).val();
                console.log(this.selectedDrpFilter);
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
        temp() {
            $("#ReportPage input").css({
                "border": "none"
            });
            $("#ReportPage textarea").css({
                "border": "none"
            });

            const { jsPDF } = window.jspdf;
            const reportPage = document.getElementById('ReportPage');

            // Padding size in mm
            const padding = 10;

            // Use a lower scale to reduce resolution and file size
            const scale = 2;

            html2canvas(reportPage, { scale }).then((canvas) => {
                // Reduce the quality of the image to reduce file size
                const imgData = canvas.toDataURL('image/png', 1); // 0.6 is the quality from 0 to 1
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * padding; // Width with padding
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                // Centering the image on the PDF
                const x = padding;
                const y = padding;

                pdf.addImage(imgData, 'PNG', x, y, pdfWidth, pdfHeight);
                pdf.save('SSA_Invoice.pdf');
            });
            setInterval(() => {
                $("#ReportPage input").css({
                    "border": "1px solid lightgrey"
                });
                $("#ReportPage textarea").css({
                    "border": "1px solid lightgrey"
                });
            }, 4000);
        },
    },
    mounted() {
        this.initializeSelect2();
        this.readInvoiceData();
        // Reset name when modal is hidden
        $('#addInvoice-Modal').on('hidden.bs.modal', () => {
            this.clearAddFormData();
        });
    }
});

// For Development & Production Code
Vue.config.productionTip = false;
Vue.config.devtools = true;
