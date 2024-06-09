var vm = new Vue({
    el: '#app',
    data: {
        currentPage: 1,
        rowsPerPage: 10,
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
            {
                sNo: 3,
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
                sNo: 4,
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
                sNo: 5,
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
                sNo: 6,
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
                sNo: 7,
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
                sNo: 8,
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
                sNo: 9,
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
                sNo: 10,
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
                sNo: 11,
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
        ]
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
            $('#dateRangePicker').val(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            console.log("Selected date range:", start.format('MMMM D, YYYY'), ' - ', end.format('MMMM D, YYYY'));
        },
    },
    mounted() {
        var start = moment().subtract(29, 'days');
        var end = moment();
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

           // Initialize Select2 for single select
           $('#single').select2({
            placeholder: 'Select a programming language',
            allowClear: true
        }).on('change', function (e) {
            console.log($(this).val());
        });

        // Initialize Select2 for multiple select
        $('#multiple').select2({
            placeholder: 'Select a programming language',
            allowClear: true
        }).on('change', function (e) {
            console.log($(this).val());
        });
    }
});


