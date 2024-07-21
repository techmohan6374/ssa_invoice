// Firebase Configuration
var firebaseConfig = {
    apiKey: "AIzaSyBHwvVJguhnbmQcJYIL98RgUIfOzwKWSMc",
    authDomain: "ssa-database-f0db2.firebaseapp.com",
    databaseURL: "https://ssa-database-f0db2-default-rtdb.firebaseio.com",
    projectId: "ssa-database-f0db2",
    storageBucket: "ssa-database-f0db2.appspot.com",
    messagingSenderId: "70296952416",
    appId: "1:70296952416:web:d63e6fdbdc187f0b5fed05",
    measurementId: "G-HTCZM5LFF7"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

const Main = {
    template: `
    <div id="mainPage">
        
        <div v-if="loaderStatus" class="loader-div flex"
            style="position: absolute;left:0px;top:0px;width:100%;height:100%;background-color: rgb(0, 0, 0,0.9);z-index: 2;">
            <div class="loader">
            </div>
        </div>

        <div class="side-menu" style="width: 80px;">
            <div class="nav-header mb-4">
                <a href="#">
                    <img src="resources/images/ssa_logo.png" alt="Taskhops Logo" class="SSA Logo"
                        style="width: 100%; display: block;border:2px solid white;border-radius: 50%;">
                </a>
            </div>
            <div class="nav-body">
                <ul class="p-0 my-4">
                    <li style="padding-left: 2px;" title="Dashboard">
                        <a href="#" class="tab flex gap-2 justify-content-start"
                            :class="{ active: currentTab === 'Tab 1' }" v-on:click="switchTab('Tab 1')">
                            <iconify-icon icon="material-symbols:dashboard-outline"
                                style="font-size: 20px; margin-left: -2px;">
                            </iconify-icon>
                        </a>
                    </li>
                    <li title="Create Invoice">
                        <a href="#" class="tab flex gap-2 justify-content-start"
                            :class="{ active: currentTab === 'Tab 2' }" v-on:click="switchTab('Tab 2')">
                            <iconify-icon icon="carbon:document" style="font-size: 20px;"></iconify-icon>
                        </a>
                    </li>
                    <li title="Update Invoice">
                        <a href="#" class="tab flex gap-2 justify-content-start"
                            :class="{ active: currentTab === 'Tab 3' }" v-on:click="switchTab('Tab 3')">
                            <iconify-icon icon="mingcute:user-edit-fill" style="font-size: 20px;"></iconify-icon>
                        </a>
                    </li>
                </ul>

            </div>
        </div>

        <div class="main" style="margin-left: 80px;" v-if="currentTab === 'Tab 1'">
            <div class="main-header">
                <div class="row" style="width: 100%;">
                    <div class="col-12">
                        <div class="dashboard-show flex gap-2">
                            <iconify-icon icon="material-symbols:dashboard-outline" style="font-size: 20px;">
                            </iconify-icon>Invoice Dashboard
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-body p-3">
                <div class="row bg-white mb-2 filter-div" style="border-radius: 5px;padding: 10px;margin:0px;">
                    <div class="col-12 col-xl-3 mb-3" style="position: relative;">
                        <label for="dateRangePicker" class="d-block fw-bold mb-2"
                            style="color:var(--primary-color)">Select Date Range</label>
                        <input type="date" v-model="selectedDate" style="width:100%;">
                    </div>
                    <div class="col-12 col-xl-3 mb-3">
                        <label for="single" class="d-block fw-bold mb-2" style="color:var(--primary-color)">Select
                            Template</label>
                        <select id="single" class="js-states" style="width: 100%;">
                            <option value="">Select a template</option>
                            <option value="Sri Gokulam Hospital">Sri Gokulam Hospital</option>
                            <option value="Sri Gokulam Speciality Hospital">Sri Gokulam Speciality Hospital</option>
                            <option value="Lakshmi Hotels">Lakshmi Hotels</option>
                        </select>

                    </div>
                    <div class="col-12 col-xl-3 mb-3 search-field" style="margin-top: 30px;position: relative;">
                        <input id="searchText" type="text" style="width: 100%;" v-model="searchText" required>
                        <label for="searchText">Search</label>
                        <iconify-icon icon="ri:search-line"
                            style="position: absolute;top:15px;right:25px;"></iconify-icon>
                    </div>
                    <div class="col-12 col-xl-3 mb-3" style="margin-top: 30px;">
                        <button class="flex" style="width: 100%;" title="Download PDF"
                            v-on:click="dashboardReportDownload()">
                            <iconify-icon icon="ic:baseline-download" style="font-size: 25px;"></iconify-icon>
                            Download Report
                        </button>
                    </div>
                </div>
                <div class="card position-relative border-0 rounded-0">
                    <div class="table-card scroll-bar">
                        <table id="invoice-table">
                            <thead>
                                <tr>
                                    <th>Invoice No</th>
                                    <th>Date</th>
                                    <th>Head Name</th>
                                    <th>Address</th>
                                    <th>PinCode</th>
                                    <th>GSTIN</th>
                                    <th>Place Of Supply</th>
                                    <th>R.O.No</th>
                                    <th>R.O.Date</th>
                                    <th>Product</th>
                                    <th>Key No</th>
                                    <th>Caption</th>
                                    <th>Size</th>
                                    <th>Area</th>
                                    <th>Page Position</th>
                                    <th>Rate Per Sqcm</th>
                                    <th>Initial Toal</th>
                                    <th>Discount %</th>
                                    <th>GST %</th>
                                    <th>Net Amount</th>
                                    <th class="flex position-sticky"
                                        style="width:140px;height:114px;right:-10px;background-color: var(--primary-color);">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, index) in paginatedData" :key="index">
                                    <td>{{ row.No }}</td>
                                    <td>{{ row.Date }}</td>
                                    <td>{{ row.HeadName }}</td>
                                    <td>{{ row.Address }}</td>
                                    <td>{{ row.PinCode }}</td>
                                    <td>{{ row.GSTIN }}</td>
                                    <td>{{ row.PlaceOfSupply }}</td>
                                    <td>{{ row.RONo }}</td>
                                    <td>{{ row.RODate }}</td>
                                    <td>{{ row.ProductName }}</td>
                                    <td>{{ row.KeyNo }}</td>
                                    <td>{{ row.Caption }}</td>
                                    <td>{{ row.SizeWidth }} X {{row.SizeHeight}}</td>
                                    <td>{{ row.AreaOfEdition }}</td>
                                    <td>{{ row.PagePosition }}</td>
                                    <td>{{ row.Rate }}</td>
                                    <td>{{ row.InitialTotal }}</td>
                                    <td>{{ row.Discount }}%</td>
                                    <td>{{ row.GST }}%</td>
                                    <td>{{ row.NetTotal }}</td>
                                    <td class="flex position-sticky bg-white gap-2"
                                        style="width:140px;height:114px;right:-10px;border: 1px solid rgb(185, 185, 185);">
                                        <!-- <button class="btn-view flex" title="Edit">
                                            <iconify-icon icon="fluent:edit-arrow-back-20-filled"></iconify-icon>
                                        </button> -->
                                        <button class="btn-view flex" title="Add"
                                            style="background-color: var(--fifth-color);"
                                            v-on:click="addToInvoie(row.No)">
                                            <iconify-icon icon="fluent:add-12-filled"></iconify-icon>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row my-4">
                    <div class="col-12 col-xl-5 mb-2">
                        Total Invoice Count : <span class="fw-bold">{{invoiceTotalData.length}}</span>
                    </div>
                    <div class="col-12 col-xl-7 mb-2">
                        <div class="pagination">
                            <button title="First Page" v-on:click="goToPage(1)" :disabled="currentPage === 1">
                                <iconify-icon icon="material-symbols:first-page"></iconify-icon>
                            </button>
                            <button title="Previous Page" v-on:click="prevPage" :disabled="currentPage === 1">
                                <iconify-icon icon="fe:arrow-left"></iconify-icon>
                            </button>
                            <button class="page-number" :title="page" v-for="page in visiblePages" :key="page"
                                v-on:click="goToPage(page)" :class="{ power: currentPage === page }">
                                {{ page }}
                            </button>
                            <button title="Next Page" v-on:click="nextPage" :disabled="currentPage === totalPages">
                                <iconify-icon icon="fe:arrow-right"></iconify-icon>
                            </button>
                            <button title="Last Page" v-on:click="goToPage(totalPages)"
                                :disabled="currentPage === totalPages">
                                <iconify-icon icon="material-symbols:last-page"></iconify-icon>
                            </button>

                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="main" style="margin-left: 80px;" v-if="currentTab === 'Tab 2'">
            <div class="main-header">
                <div class="row" style="width: 100%;">
                    <div class="col-12 col-xl-3">
                        <div class="dashboard-show flex gap-2">
                            <iconify-icon icon="carbon:document" style="font-size: 20px;"></iconify-icon>Create Invoice
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-body p-3">
                <div class="row bg-white mb-2 p-3" style="border-radius: 5px;margin:0px;">
                    <div class="col-12 col-xl-8 mb-2">
                        <h4 class="mt-2">Dynamic Invoice</h4>
                    </div>
                    <div class="col-12 col-xl-2 mb-2 flex">
                        <button class="add-invoice-btn flex gap-2" title="Add Invoice"
                            v-on:click="openaddInvoiceModal()">
                            <iconify-icon icon="icon-park-outline:add-one" style="font-size: 25px;"></iconify-icon>
                            Add Invoice
                        </button>
                    </div>
                    <div class="col-12 col-xl-2 mb-2 flex">
                        <button class="save-invoice-btn flex gap-2" title="Save All" v-on:click="saveInvoiceData()">
                            <iconify-icon icon="material-symbols:save" style="font-size: 25px;"></iconify-icon>
                            Save All
                        </button>
                    </div>
                </div>
                <div class="card position-relative border-0 rounded-0">
                    <div class="table-card scroll-bar">
                        <table id="dataTable">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Date</th>
                                    <th>Head Name</th>
                                    <th>Address</th>
                                    <th>PinCode</th>
                                    <th>GSTIN</th>
                                    <th>Place Of Supply</th>
                                    <th>R.O.No</th>
                                    <th>R.O.Date</th>
                                    <th>Product</th>
                                    <th>Key No</th>
                                    <th>Caption</th>
                                    <th>Size</th>
                                    <th>Area</th>
                                    <th>Page Position</th>
                                    <th>Rate Per Sqcm</th>
                                    <th>Total Amount</th>
                                    <th>Discount</th>
                                    <th>GST</th>
                                    <th>Net Amount</th>
                                    <th class="flex position-sticky"
                                        style="width:100px;height:114px;right:-10px;background-color: var(--primary-color);">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in invoiceData">
                                    <td>{{ row.No }}</td>
                                    <td>{{ row.Date }}</td>
                                    <td>{{ row.HeadName }}</td>
                                    <td>{{ row.Address }}</td>
                                    <td>{{ row.PinCode }}</td>
                                    <td>{{ row.GSTIN }}</td>
                                    <td>{{ row.PlaceOfSupply }}</td>
                                    <td>{{ row.RONo }}</td>
                                    <td>{{ row.RODate }}</td>
                                    <td>{{ row.ProductName }}</td>
                                    <td>{{ row.KeyNo }}</td>
                                    <td>{{ row.Caption }}</td>
                                    <td>{{ row.SizeWidth }} X {{row.SizeHeight}}</td>
                                    <td>{{ row.AreaOfEdition }}</td>
                                    <td>{{ row.PagePosition }}</td>
                                    <td>{{ row.Rate }}</td>
                                    <td>{{ row.InitialTotal }}</td>
                                    <td>{{ row.Discount }}</td>
                                    <td>{{ row.GST }}</td>
                                    <td>{{ row.NetTotal }}</td>
                                    <td class="flex position-sticky bg-white gap-2"
                                        style="width:150px;height:114px;right:-10px;border: 1px solid rgb(185, 185, 185);">
                                        <button class="btn-view flex" title="View"
                                            style="background-color: var(--fifth-color)"
                                            v-on:click="editInvoice(row.No)">
                                            <iconify-icon icon="ic:baseline-remove-red-eye"></iconify-icon>
                                        </button>
                                        <button class="btn-view flex" title="Delete"
                                            style="background-color: var(--fourth-color);"
                                            v-on:click="deleteInvoice(row.No)">
                                            <iconify-icon icon="material-symbols:delete"></iconify-icon>
                                        </button>
                                    </td>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="main" style="margin-left: 80px;" v-if="currentTab === 'Tab 3' ">
            <div class="main-header">
                <div class="row" style="width: 100%;">
                    <div class="col-12 col-xl-3">
                        <div class="dashboard-show flex gap-2">
                            <iconify-icon icon="mingcute:user-edit-fill"></iconify-icon></iconify-icon>Update Invoice
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-body p-3">
                <div class="row bg-white flex mb-2 p-3"
                    style="border-radius: 5px;margin:0px;min-width: 100%;max-width: 966px;overflow-x: auto;">
                    <div id="ReportPage" class="box p-0">
                        <div class="gr-box gr-box-1 flex" style="grid-area: item-1">
                            <div class="heading">
                                <h6>SAI SOUNDAR AGENCY</h6>
                            </div>
                            <div class="address-info">
                                <p>307, TVK MAIN ROAD, AMMAPET,</p>
                                <p>SALEM-3.</p>
                                <p style="color:var(--theme-color)">Ph : 96009-69147, 94433-46999</p>
                                <p>Email : soundarslm9@gmail.com</p>
                                <p>saisoundarslm9@gmail.com</p>
                                <p>State : Tamilndau Code : 33</p>
                            </div>
                        </div>
                        <div class="gr-box gr-box-2 flex" style="grid-area: item-2">
                            PAN No : <span style="color: var(--theme-color);">&nbsp;BBJPS9560A</span>
                        </div>
                        <div class="gr-box gr-box-3 flex" style="grid-area: item-3">
                            (ORIGINAL)
                        </div>
                        <div class="gr-box gr-box-4 flex" style="grid-area: item-4">
                            GSTIN : <span style="color: var(--theme-color);">&nbsp;33BBJPS9560A2ZK</span>
                        </div>
                        <div class="gr-box gr-box-5 flex" style="grid-area: item-5">
                            Advertisement Invoice
                        </div>
                        <div class="gr-box gr-box-6 flex" style="grid-area: item-6">
                            <div class="left flex">
                                Invoice No:&nbsp;
                                <input type="text" v-model="invoice.No">
                            </div>
                            <div class="right flex">
                                Date:&nbsp;
                                <input type="text" v-model="invoice.Date">
                            </div>
                        </div>
                        <div class="gr-box gr-box-7 flex" style="grid-area: item-7">
                            <div class="left">
                                <div class="div-1">A/c Head : </div>
                                <div class="div-2">Address : </div>
                                <div class="div-3">Pincode : </div>
                                <div class="div-4">GSTIN : </div>
                                <div class="div-5">Place of Supply : </div>
                            </div>
                            <div class="right">
                                <div class="div-1" style="margin-bottom: 4px;">
                                    <div v-html="invoice.HeadName" contenteditable class="text-area" id="powerHeadName">
                                    </div>
                                </div>
                                <div class="div-2" style="margin-bottom: 9px;">
                                    <div v-html="invoice.Address" contenteditable class="text-area" id="powerAddress">
                                    </div>
                                </div>
                                <div class="div-3">
                                    <input type="text" v-model="invoice.PinCode">
                                </div>
                                <div class="div-4">
                                    <input type="text" v-model="invoice.GSTIN">
                                </div>
                                <div class="div-5">
                                    <input type="text" v-model="invoice.PlaceOfSupply">
                                </div>
                            </div>
                        </div>
                        <div class="gr-box gr-box-8 flex" style="grid-area: item-8">
                            <div class="left">
                                <div class="div-1" style="font-size:20px;">
                                    KALAIKADHIR
                                </div>
                                <div class="div-3">R.O.No : </div>
                                <div class="div-4">R.O.Date : </div>
                                <div class="div-5" style="margin-bottom: 63px;">Product : </div>
                                <div class="div-6">Key No : </div>
                                <div class="div-7">Caption : </div>
                            </div>
                            <div class="right">
                                <div style="margin: 5px 0px 4px 10px;">
                                    Agency Code : AAS185
                                </div>
                                <div>
                                    <input type="text" v-model="invoice.RONo">
                                </div>
                                <div>
                                    <input type="text" v-model="invoice.RODate">
                                </div>
                                <div style="margin-bottom: 7px;">
                                    <div class="text-area" v-html="invoice.ProductName" contenteditable
                                        id="powerProductName"></div>
                                </div>
                                <div>
                                    <input type="text" v-model="invoice.KeyNo">
                                </div>
                                <div>
                                    <input type="text" v-model="invoice.Caption">
                                </div>
                            </div>
                        </div>
                        <div class="gr-box gr-box-9 flex" style="grid-area: item-9;text-align: center;">
                            Date of Insertion
                        </div>
                        <div class="gr-box gr-box-10 flex" style="grid-area: item-10;">
                            <div class="top flex">Size</div>
                            <div class="bottom flex">Sq Cm</div>
                        </div>
                        <div class="gr-box gr-box-11 flex" style="grid-area: item-11;text-align: center;">
                            Area Edition
                        </div>
                        <div class="gr-box gr-box-12 flex" style="grid-area: item-12;">
                            Position Page No.
                        </div>
                        <div class="gr-box gr-box-13 flex" style="grid-area: item-13;">
                            Rate Per Sqcm Premium
                        </div>
                        <div class="gr-box gr-box-14 flex" style="grid-area: item-14;">
                            Amount
                        </div>
                        <div class="gr-box gr-box-15 flex" style="grid-area: item-15;">
                            <input type="text" v-model="invoice.Date" style="text-align: center;">
                        </div>
                        <div class="gr-box gr-box-16 flex" style="grid-area: item-16;">
                            <input type="text" v-model="invoice.SizeWidth" style="text-align: right;">
                            <iconify-icon icon="ic:twotone-close"></iconify-icon>
                            <input type="text" v-model="invoice.SizeHeight" style="text-align: left;">
                        </div>
                        <div class="gr-box gr-box-17 flex" style="grid-area: item-17;">
                            <input type="text" v-model="invoice.AreaOfEdition" style="text-align: center;">
                        </div>
                        <div class="gr-box gr-box-18 flex" style="grid-area: item-18;">
                            <input type="text" v-model="invoice.PagePosition" style="text-align: center;">
                        </div>
                        <div class="gr-box gr-box-19 flex" style="grid-area: item-19;">
                            <input type="text" v-model="invoice.Rate" style="text-align: center;">
                        </div>
                        <div class="gr-box gr-box-20 flex" style="grid-area: item-20;">
                            <input type="text" v-model="invoice.initialTotal" style="text-align: right;">
                        </div>
                        <div class="gr-box gr-box-21 flex" style="grid-area: item-21;">
                            <div class="left flex">
                                <div class="flex" style="color:#00b050">Product Discount &nbsp;&nbsp;&nbsp;
                                    <span id="powerDiscount" contenteditable>{{invoice.Discount}}</span> %
                                </div>
                                <div>Amount</div>
                                <div>CGST {{invoice.GSTPercent}} %</div>
                                <div>SGST {{invoice.GSTPercent}} %</div>
                            </div>
                            <div class="right flex">
                                <div>{{invoice.DiscountTotal}}</div>
                                <div>{{invoice.interMediateTotal}}</div>
                                <div>{{invoice.GSTAmt}}</div>
                                <div>{{invoice.GSTAmt}}</div>
                            </div>
                        </div>
                        <div class="gr-box gr-box-22 flex" style="grid-area: item-22;">
                            <div class="left flex">
                                Net Amount&nbsp;
                            </div>
                            <div class="right flex">
                                {{invoice.NetTotal}}
                            </div>
                        </div>
                        <div class="gr-box gr-box-23 flex" style="grid-area: item-23;">
                            Rupees {{amountInWords}} Only
                        </div>
                        <div class="gr-box gr-box-24 flex" style="grid-area: item-24;">
                            <div class="top flex">
                                <span>For</span>
                                <p>SAI SOUNDAR AGENCY</p>
                            </div>
                            <div class="bottom flex">
                                <img src="resources/images/signature.png" alt="signature">
                            </div>
                        </div>
                        <div class="gr-box gr-box-25 flex" style="grid-area: item-25;">
                            E.&.O.E
                        </div>
                        <div class="gr-box gr-box-26" style="grid-area: item-26;">
                            Thank you for advertising with Us. We Look forward to Your Condinued
                        </div>
                        <div class="gr-box gr-box-27" style="grid-area: item-27;">
                            <div>The DD/Cheque should be drawn in favour of</div>
                            <div><b>“SAI SOUNDAR AGENCY” </b>payable at</div>
                            <div>Bank : <b>SBI Fairlands Branch,</b> by Credit to our</div>
                            <div>Current Account No. : <b>36055403919</b></div>
                            <div>RTGS : <b>SAI SOUNDAR AGENCY,</b></div>
                            <div>IFS Code : <b>SBIN0021724</b></div>
                        </div>
                    </div>
                </div>
                <div class="row bg-white mb-2 p-3" style="border-radius: 5px;margin:0px;">
                    <div class="col-12 col-xl-6 mb-2">
                        <button v-on:click="temp()" class="btns-download flex gap-2">
                            <iconify-icon icon="ic:baseline-download" style="font-size: 25px;"></iconify-icon>
                            Download Invoice
                        </button>
                    </div>
                    <div class="col-12 col-xl-6 mb-2">
                        <button v-on:click="UpdateInvoiceData()" class="btns-update flex gap-2">
                            <iconify-icon icon="fluent:edit-arrow-back-20-filled"
                                style="font-size:25px;"></iconify-icon>
                            Update Invoice
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Invoice Modal -->
        <div class="modal fade" id="addInvoice-Modal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Add Invoice Fields</h5>
                        <button class="btns-close flex" v-on:click="closeaddInvoiceModal()">
                            <iconify-icon icon="ic:round-close"></iconify-icon>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="text" placeholder="Enter Invoice Number" v-model="invoice.No">
                            </div>
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="date" v-model="invoice.Date">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="text" placeholder="Enter A/C Head Name" v-model="invoice.HeadName">
                            </div>
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="text" placeholder="Enter Address" v-model="invoice.Address">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="text" placeholder="Enter Pincode" v-model="invoice.PinCode">
                            </div>
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="text" placeholder="Enter GSTIN" v-model="invoice.GSTIN">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="text" placeholder="Enter Place Of Supply" v-model="invoice.PlaceOfSupply">
                            </div>
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="date" v-model="invoice.RODate">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="text" placeholder="Enter R.O Number" v-model="invoice.RONo">
                            </div>
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="text" placeholder="Enter Product Name" v-model="invoice.ProductName">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="text" placeholder="Enter Key Number" v-model="invoice.KeyNo">
                            </div>
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="text" placeholder="Enter Caption" v-model="invoice.Caption">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="number" placeholder="Enter Size-1" v-model="invoice.SizeWidth">
                            </div>
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="number" placeholder="Enter Size-2" v-model="invoice.SizeHeight">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="text" placeholder="Enter Area Of Edition" v-model="invoice.AreaOfEdition">
                            </div>
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="text" placeholder="Enter Page Position" v-model="invoice.PagePosition">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="text" placeholder="Enter Rate" v-model="invoice.Rate">
                            </div>
                            <div class="col-12 col-xl-6 mb-2">
                                <input type="number" placeholder="Enter GST Percentage" v-model="invoice.GST">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-xl-6 mb-3">
                                <input type="number" placeholder="Enter Discount" v-model="invoice.Discount">
                            </div>
                        </div>
                        <div class="row flex justify-content-end">
                            <div class="col-12 mb-2">
                                <button class="add-invoice-btn flex gap-2" title="Add Invoice"
                                    v-on:click="addInvoiceData()">
                                    <iconify-icon icon="icon-park-outline:add-one"
                                        style="font-size: 25px;"></iconify-icon>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    `,
    created() {
        const password = this.$route.params.password;
        if (password != 'ssax') {
            this.$router.push(`/login`);
        }
    },
    data() {
        return {
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
                PinCode: '',
                GSTIN: '',
                PlaceOfSupply: '',
                RONo: '',
                RODate: '',
                ProductName: '',
                KeyNo: '',
                Caption: '',
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
                GSTPercent: null,
                GSTAmt: null,
                NetTotal: null
            },
            invoiceTotalData: [],
            amountInWords: '',
            currentPage: 1,
            rowsPerPage: 6,
            selectedDate: '',
            currentTab: 'Tab 1'
        };
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
        getDashboardData() {
            // Use moment.js for date formatting
            var Task = this.filteredDashboardData;
            return Task;
        },

        totalPages() {
            return Math.ceil(this.getDashboardData.length / this.rowsPerPage);
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.rowsPerPage;
            return this.getDashboardData.slice(start, start + this.rowsPerPage);
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
            this.invoice.initialTotal = (parseFloat(this.invoice.SizeWidth) * parseFloat(this.invoice.SizeHeight) * parseFloat(this.invoice.Rate));
            this.invoice.initialTotal = parseFloat(this.invoice.initialTotal).toFixed(2);
            console.log(this.invoice.initialTotal);
            this.invoice.Rate = parseFloat(this.invoice.Rate).toFixed(2);

            this.invoice.DiscountTotal = (parseFloat(this.invoice.initialTotal) * (parseFloat(this.invoice.Discount) / 100)).toFixed(2);
            console.log(this.invoice.DiscountTotal);

            this.invoice.interMediateTotal = (parseFloat(this.invoice.initialTotal) - parseFloat(this.invoice.DiscountTotal)).toFixed(2);
            console.log(this.invoice.interMediateTotal);
            console.log(this.invoice.GST);
            this.invoice.GSTPercent = (parseFloat(this.invoice.GST) / 2).toFixed(2);
            console.log(this.invoice.GSTPercent);

            this.invoice.GSTAmt = ((parseFloat(this.invoice.interMediateTotal) * (parseFloat(this.invoice.GSTPercent) / 100))).toFixed(2);
            console.log(this.invoice.GSTAmt);

            this.invoice.NetTotal = (parseFloat(this.invoice.interMediateTotal) + (parseFloat(this.invoice.GSTAmt)) + (parseFloat(this.invoice.GSTAmt))).toFixed(2);
            console.log(this.invoice.NetTotal);
        },

        addInvoiceData() {
            var notyf = new Notyf();
            this.calculateInvoiceData();
            this.invoiceData.push({
                No: this.invoice.No,
                Date: moment(this.invoice.Date).format('DD-MM-YYYY'),
                HeadName: this.invoice.HeadName.toUpperCase(),
                Address: this.invoice.Address,
                PinCode: this.invoice.PinCode,
                GSTIN: this.invoice.GSTIN.toUpperCase(),
                PlaceOfSupply: this.invoice.PlaceOfSupply,
                RONo: this.invoice.RONo,
                RODate: moment(this.invoice.RODate).format('DD-MM-YYYY'),
                ProductName: this.invoice.ProductName.toUpperCase(),
                KeyNo: this.invoice.KeyNo.toUpperCase(),
                Caption: this.invoice.Caption.toUpperCase(),
                SizeWidth: this.invoice.SizeWidth,
                SizeHeight: this.invoice.SizeHeight,
                AreaOfEdition: this.invoice.AreaOfEdition.toUpperCase(),
                PagePosition: this.invoice.PagePosition.toUpperCase(),
                Rate: this.invoice.Rate,
                InitialTotal: this.invoice.initialTotal,
                Discount: this.invoice.Discount,
                DiscountTotal: this.invoice.DiscountTotal,
                interMediateTotal: this.invoice.interMediateTotal,
                GST: this.invoice.GST,
                GSTPercent: this.invoice.GSTPercent,
                GSTAmt: this.invoice.GSTAmt,
                NetTotal: this.invoice.NetTotal
            });
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
                    this.invoiceData = [];
                })
                .catch((error) => {
                    notyf.error('Failed to save invoices');
                    console.error(error);
                });
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

            var powerHeadName = document.querySelector('#powerHeadName').innerHTML;
            var powerAddress = document.querySelector('#powerAddress').innerHTML;
            var powerProductName = document.querySelector('#powerProductName').innerHTML;
            var powerDiscount = document.querySelector('#powerDiscount').innerHTML;
            this.invoice.Discount = powerDiscount;
            this.calculateInvoiceData();
            let indexToUpdate = this.invoiceData.findIndex(invoice => invoice.No === this.updatedId);
            if (indexToUpdate !== -1) {
                this.invoiceData[indexToUpdate].No = this.invoice.No;
                this.invoiceData[indexToUpdate].Date = this.invoice.Date;
                this.invoiceData[indexToUpdate].HeadName = powerHeadName.toUpperCase();
                this.invoiceData[indexToUpdate].Address = powerAddress;
                this.invoiceData[indexToUpdate].PinCode = this.invoice.PinCode;
                this.invoiceData[indexToUpdate].GSTIN = this.invoice.GSTIN.toUpperCase();
                this.invoiceData[indexToUpdate].PlaceOfSupply = this.invoice.PlaceOfSupply;
                this.invoiceData[indexToUpdate].RONo = this.invoice.RONo;
                this.invoiceData[indexToUpdate].RODate = this.invoice.RODate;
                this.invoiceData[indexToUpdate].ProductName = powerProductName.toUpperCase();
                this.invoiceData[indexToUpdate].KeyNo = this.invoice.KeyNo.toUpperCase();
                this.invoiceData[indexToUpdate].Caption = this.invoice.Caption.toUpperCase();
                this.invoiceData[indexToUpdate].SizeWidth = this.invoice.SizeWidth;
                this.invoiceData[indexToUpdate].SizeHeight = this.invoice.SizeHeight;
                this.invoiceData[indexToUpdate].AreaOfEdition = this.invoice.AreaOfEdition.toUpperCase();
                this.invoiceData[indexToUpdate].PagePosition = this.invoice.PagePosition.toUpperCase();
                this.invoiceData[indexToUpdate].Rate = this.invoice.Rate;
                this.invoiceData[indexToUpdate].InitialTotal = this.invoice.initialTotal;
                this.invoiceData[indexToUpdate].Discount = powerDiscount;
                this.invoiceData[indexToUpdate].DiscountTotal = this.invoice.DiscountTotal;
                this.invoiceData[indexToUpdate].interMediateTotal = this.invoice.interMediateTotal;
                this.invoiceData[indexToUpdate].GST = this.invoice.GST;
                this.invoiceData[indexToUpdate].GSTPercent = this.invoice.GSTPercent;
                this.invoiceData[indexToUpdate].GSTAmt = this.invoice.GSTAmt;
                this.invoiceData[indexToUpdate].NetTotal = this.invoice.NetTotal
                this.amountInWords = this.convertToWords(this.invoice.NetTotal);
                notyf.success('Updated successfully');
            } else {
                console.error('Invoice not found for updating');
            }
        },
        editInvoice(no) {

            // Find the invoice by its No
            let invoiceToEdit = this.invoiceData.find(invoice => invoice.No === no);
            if (invoiceToEdit) {
                // Populate the invoice object with found data
                this.invoice.No = invoiceToEdit.No,
                    this.invoice.Date = invoiceToEdit.Date,
                    this.invoice.HeadName = invoiceToEdit.HeadName.toUpperCase(),
                    this.invoice.Address = invoiceToEdit.Address,
                    this.invoice.PinCode = invoiceToEdit.PinCode,
                    this.invoice.GSTIN = invoiceToEdit.GSTIN.toUpperCase(),
                    this.invoice.PlaceOfSupply = invoiceToEdit.PlaceOfSupply,
                    this.invoice.RONo = invoiceToEdit.RONo,
                    this.invoice.RODate = invoiceToEdit.RODate,
                    this.invoice.ProductName = invoiceToEdit.ProductName.toUpperCase(),
                    this.invoice.KeyNo = invoiceToEdit.KeyNo.toUpperCase(),
                    this.invoice.Caption = invoiceToEdit.Caption.toUpperCase(),
                    this.invoice.SizeWidth = invoiceToEdit.SizeWidth,
                    this.invoice.SizeHeight = invoiceToEdit.SizeHeight,
                    this.invoice.AreaOfEdition = invoiceToEdit.AreaOfEdition.toUpperCase(),
                    this.invoice.PagePosition = invoiceToEdit.PagePosition.toUpperCase(),
                    this.invoice.Rate = invoiceToEdit.Rate,
                    this.invoice.InitialTotal = invoiceToEdit.initialTotal,
                    this.invoice.Discount = invoiceToEdit.Discount,
                    this.invoice.DiscountTotal = invoiceToEdit.DiscountTotal,
                    this.invoice.interMediateTotal = invoiceToEdit.interMediateTotal,
                    this.invoice.GST = invoiceToEdit.GST,
                    this.invoice.GSTPercent = invoiceToEdit.GSTPercent,
                    this.invoice.GSTAmt = invoiceToEdit.GSTAmt,
                    this.invoice.NetTotal = invoiceToEdit.NetTotal

                this.updatedId = no;
                this.amountInWords = this.convertToWords(invoiceToEdit.NetTotal);
                this.calculateInvoiceData();
                this.goToTab3();

            } else {
                console.error('Invoice not found for editing');
            }
        },

        clearAddFormData() {
            this.invoice.No = null,
                this.invoice.Date = '',
                this.invoice.HeadName = '',
                this.invoice.Address = '',
                this.invoice.PinCode = '',
                this.invoice.GSTIN = '',
                this.invoice.PlaceOfSupply = '',
                this.invoice.RONo = '',
                this.invoice.RODate = '',
                this.invoice.ProductName = '',
                this.invoice.KeyNo = '',
                this.invoice.Caption = '',
                this.invoice.SizeWidth = null,
                this.invoice.SizeHeight = null,
                this.invoice.AreaOfEdition = '',
                this.invoice.PagePosition = '',
                this.invoice.Rate = null,
                this.invoice.InitialTotal = null,
                this.invoice.Discount = null,
                this.invoice.DiscountTotal = null,
                this.invoice.interMediateTotal = null,
                this.invoice.GST = null,
                this.invoice.GSTPercent = null,
                this.invoice.GSTAmt = null,
                this.invoice.NetTotal = null
        },

        convertToWords(amount) {
            var a = ["", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ", "Eleven ", "Twelve ", "Thirteen ",
                "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "];
            var b = ["", "", "Twenty ", "Thirty ", "Forty ", "Fifty ", "Sixty ", "Seventy ", "Eighty ", "Ninety "];

            function inWords(num) {
                if ((num = num.toString()).length > 9) return "Overflow";
                var n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
                if (!n) return "";
                var str = "";
                str += n[1] != 0 ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore " : "";
                str += n[2] != 0 ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh " : "";
                str += n[3] != 0 ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand " : "";
                str += n[4] != 0 ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred " : "";
                str += n[5] != 0 ? (str != "" ? "And " : "") + (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) : "";
                return str.trim();
            }

            // Remove decimal part if any
            var integerAmount = Math.floor(amount);

            return inWords(integerAmount);
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
            var notyf = new Notyf();
            $("#ReportPage input").css({
                "border": "none"
            });
            $(".text-area").css({
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
                notyf.success('Report Saved successfully');

            });
            setInterval(() => {
                $("#ReportPage input").css({
                    "border": "1px solid lightgrey"
                });
                $(".text-area").css({
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
};
