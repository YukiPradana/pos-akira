/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/*var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};*/

/*ons.ready(function(){
  window.document.addEventListener('backbutton', function() {
    disableDeviceBackButtonHandler();
    if (appNavigator.pages.length > 1) {
        appNavigator.popPage();
    } else {
         if (navigator.notification.confirm("Are you sure to close the app?",
             function(index) {
                 if (index == 1) { // OK button
                     navigator.app.exitApp(); // Close the app
                 }
             }
         ));
     }

 }, false);
});*/

//Data Json

var tamuData;
var terapisData;
var jasaData;
var storage = window.localStorage;

var checkinID;
var checkinUname
var checkoutID;

var durasi;
var refID;
var refIDCheckin;
var tipePembayaran;
var kodePembayaran;
var nomorTransaksi;
var jumlahJasa = [];
var total = 0;
var totalPembayaran = 0;
var jsonAsset = "";
var jsonAsset2 = "";
var namaCheckout;
var namacheckin;
var tanggalHariIni;
var waktu;
var arrayPrintPesanan = [];
var arrayPrintTerapis = [];
var printAsset = "";
var printAssetTerapis = "";
var printSend;
var arrayPemesanan = [];
var arrayPembayaranTambahan = [];
var arrayPembayaran = [];
var arrayTerapis = [];
var angkaIterasi1 = 1;
var angkaIterasi2 = 1;
var jsonPrint1;
var jsonPrint2;
var voucherValue = 0;
var tunai;
var kembalian;


function setDataCheckout(nama, id, kode) {
    refID = kode;
    checkoutID = id;
    namaCheckout = nama;
    kodePembayaran = kode;
}

function setDataCheckin(id, nama, username,kode) {
    checkinID = id;
    namacheckin = nama;
    checkinUname = username;
    refIDCheckin=kode;
}


var showPopover = function (target) {
    document
        .getElementById('popover')
        .show(target);
};


var deleteItemDetail = function (angka, harga, id) {
    $.ajax({
        method: 'post',
        url: _URL + '?query=mutation {deleteDetailReservasi(id:' + id + ') {id}}',
        success: function (data) {
            ons.notification.alert('data terhapus');
        },
        error: function (data) {
            console.log(data);
        }
    });
    total -= harga;
    $('#total-harga').text(total);
    $("#dataPesanan" + angka).remove();
}

var deleteItemDetailInvoice = function (angka, harga, id) {
    $.ajax({
        method: 'post',
        url: _URL + '?query=mutation {deleteDetail(id:' + id + ') {id}}',
        success: function (data) {
            ons.notification.alert('data terhapus');
        },
        error: function (data) {
            console.log(data);
        }
    });
    totalPembayaran -= harga;
    $('#total-harga-invoice').text(totalPembayaran);
    $("#dataInvoice" + angka).remove();

}
var deleteItem = function (angka, harga) {
    for (var i = 0; i < arrayPemesanan.length; i++) {
        var obj = arrayPemesanan[i];

        if (obj.id === angka) {
            arrayPemesanan.splice(i, 1);
            console.log("terhapus");
        }
    }

    console.log(arrayPemesanan.length);
    total -= harga;
    $('#total-harga').text(total);
    $("#dataPesanan" + angka).remove();
}



var deleteItemInvoice = function (angka, harga) {
    for (var i = 0; i < arrayPembayaran.length; i++) {
        var obj = arrayPembayaran[i];

        if (obj.id === angka) {
            arrayPembayaran.splice(i, 1);
            arrayPrintPesanan.splice(i, 1);
            console.log("terhapus");
        }
    }
    console.log("angka iterasi :" + angka);
    totalPembayaran -= harga;
    $('#total-harga-invoice').text(totalPembayaran);
    $("#dataInvoice-" + angka).remove();
}


function deleteAllItem() {
    var l = angkaIterasi1;
    for (i = 0; i < l; i++) {
        deleteItem(i, 0);
    };
    arrayPemesanan = [];
    total = 0;
    $('#total-harga').text(total);
    jsonAsset = "";
    jsonPrint1 = null;
    namacheckin = null;
    $('#nama-checkin').val(namacheckin);
    angkaIterasi1 = 1;
    checkinID = null;
    refIDCheckin=null;


}

function deleteAllItemInvoice() {
    var l = angkaIterasi2;
    for (i = 0; i <= l; i++) {
        deleteItemInvoice(i, 0);
    };
    arrayPembayaran = [];
    totalPembayaran = 0;
    $('#total-harga-invoice').text(totalPembayaran);
    jsonAsset2 = "";
    jsonPrint2 = null;
    angkaIterasi2 = 1;
    voucherValue = 0;
    arrayPrintPesanan = []
    refID =null;
    checkoutID = null;
    namaCheckout = null;
    kodePembayaran = null;

}


function editSelects(event) {
    document.getElementById('choose-sel').removeAttribute('modifier');
    if (event.target.value == 'material' || event.target.value == 'underbar') {
        document.getElementById('choose-sel').setAttribute('modifier', event.target.value);
    }
}

function formatWaktuTerapi(waktuProdukDipilih) {
    let duration;
    if (waktuProdukDipilih == 30) {
        duration = "00:30:00";
    } else if (waktuProdukDipilih == 60) {
        duration = "01:00:00";
    } else if (waktuProdukDipilih == 90) {
        duration = "01:30:00";
    } else {
        duration = "02:00:00";
    }

    return duration;
}

function getHari() {
    let myDays = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
    let date = new Date();
    let thisDay = date.getDay();
    thisDay = myDays[thisDay];

    return thisDay
}


function getTanggal() {
    let months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    let date = new Date();
    let day = '' + date.getDate();
    let month = '' + (date.getMonth() + 1);
    // let thisDay =date.getDay();
    //     thisDay = myDays[thisDay];
    let yy = date.getYear();
    let year = (yy < 1000) ? yy + 1900 : yy;

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    // let dateString = thisDay + ', ' + day + ' ' + months[month] + ' ' + year;
    let tanggal = year + '-' + month + '-' + day;

    return tanggal;

}

function getWaktu() {
    let date = new Date();
    let hour = '' + date.getHours();
    let minuts = '' + date.getMinutes();
    let second = '' + date.getSeconds();
    if (hour.length < 2) hour = '0' + hour;
    if (minuts.length < 2) minuts = '0' + minuts;
    if (second.length < 2) second = '0' + second;
    let timeString = hour + ':' + minuts + ':' + second;

    return timeString;
}

function terimaReservasi(referId){
    console.log("ididid:"+referId);
    $.ajax({
        method: 'post',
        url: _URL + '?query=mutation {TerimaReservasi(ref_id:"'+referId+'"){status,progress}}',
        success: function (data) {
            $.ajax({
                method: 'post',
                url: _URL + '?query=mutation {CheckinReservasi(ref_id:"'+referId+'"){status,progress}}',
                success: function (data) {
                    console.log(data);
                    $('#modal-checkin-submit').hide();
                    ons.notification.alert("checkin berhasil");
                    deleteAllItem();
                },
                error: function (data) {
                    ons.notification.alert("checkin gagal");
                    console.log(data);
                }
            });
        },
        error: function (data) {
            console.log(data);
        }
    });

}


function updateStatusReservasi(id) {
    console.log("ididid:"+id);
    $.ajax({
        method: 'post',
        url: _URL + '?query=mutation {CheckinReservasi(ref_id:"'+id+'"){status,progress}}',
        success: function (data) {
            console.log(data);
            $('#modal-checkin-submit').hide();
            ons.notification.alert("checkin berhasil");
            deleteAllItem();
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function updateStatusReservasiCheckout() {
    $.ajax({
        method: 'post',
        url: _URL + '?query=mutation {updateStatusReservasi(id: ' + checkoutID + ', header_reservasi_id: ' + checkoutID + ', tanggal: "' + getTanggal() + ' ' + getWaktu() + '", status: "diterima", progress: "selesai"){id,tanggal,status,progress}}',
        success: function (data) {
            console.log(data);
            deleteAllItemInvoice();
        },
        error: function (data) {
            console.log(data);
        }
    });
}

var hideAlertDialogInvoice = function () {
    document
        .getElementById('invoice-alert-dialog')
        .hide();
};

var hideAlertDialogLogout = function () {
    document
        .getElementById('logout-alert-dialog')
        .hide();
};



function setTotalPembayaranMinVoucher(val) {
    totalPembayaran = totalPembayaran - val;
    document.getElementById("total-harga-invoice").innerHTML = totalPembayaran;
};

var numberWithCommas = function (x) {

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function setVoucher(text) {
    voucher = text;
}


function inputTunaiFormat() {
    let inputUang = $('#input-tunai').val();

    kembalianOutput();

}

function kembalianOutput() {
    let inputUang = $('#input-tunai').val();
    kembalian = inputUang - totalPembayaran;
    if (kembalian > 0 ) {
        if(kembalian<totalPembayaran){
        $('#kembalian').html(numberWithCommas(kembalian));
        }else{
            $('#kembalian').html("Input terlalu banyak");
        }
    }else{
        $('#kembalian').html(0);
    }
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("search-tamu");
    filter = input.value.toUpperCase();
    ul = document.getElementById("search-tamu-list");
    li = ul.getElementsByTagName("ons-list-item");
    for (i = 0; i < li.length; i++) {
        a = document.getElementById('dataTamu-' + i);
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

var voucher;
function scanQrCodeContent(kode) {
    $('#modal-qrCode').show();
       let text=kode.text;
        voucher = text;
        $.ajax({
            method: 'get',
            url: _URL + '?query= {CheckVoucherQuery(kode: "' + text + '") {jumlah}}',
            success: function (data) {
                try {

                    let kode_value = data.data.CheckVoucherQuery.jumlah;
                    ons.notification.alert("jumlah :"+kode_value);
                    if (kode_value > 0) {
                        voucherValue += kode_value;
                        $('#modal-qrCode').hide();
                        $('#input-kode-voucher').val(voucherValue);
                        ons.notification.alert("Voucher Ditambah :)");
                    } else {
                        $('#modal-qrCode').hide();
                        ons.notification.alert("Voucher tidak valid ;(");
                    }
                } catch (err) {
                    $('#modal-qrCode').hide();
                    alert(err);
                }
                
                
            },
            error: function (data) {
                $('#modal-qrCode').hide();
                console.log(data);
            }
        });
    }

function QRcode() {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            // alert("We got a barcode\n" +
            //     "Result: " + result.text + "\n" +
            //     "Format: " + result.format + "\n" +
            //     "Cancelled: " + result.cancelled);
            if(result.cancelled!=true){
               
                scanQrCodeContent(result);
            }
                
        },
        function (error) {
            alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera: false, // iOS and Android
            showFlipCameraButton: false, // iOS and Android
            showTorchButton: true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: true, // Android, save scan history (default false)
            prompt: "Arahkan kamera kearah QRCode yang diinginkan", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
            disableAnimations: true, // iOS
            disableSuccessBeep: false // iOS and Android
        }
    );
}

function getJamBerakhir(jam_mulai){
    let waktu = jam_mulai;
    let jam = waktu.substr(0, 2);
    let menit = waktu.substr(3, 2);
    let jam2 = Number(jam) * 60;
    let menit2 = Number(menit);
    let hitung = jam2 + menit2 + waktuProdukDipilih;
    let jam3 = hitung / 60;
    let menit3 = hitung % 60;
    let jamnya = String(jam3).substr(0, 2);
    let jamBerakhirReservasi = jamnya + ':' + menit3 + ':00';
    return jamBerakhirReservasi;
}

//on init
document.addEventListener('init', function (event) {
    var page = event.target;




    // Event page Checkin
    if (page.id === 'checkin') {

        // page.querySelector('#tambah-pelanggan').onclick = function () {
        //     document.querySelector('#myNavigator').pushPage('tambahpelanggan.html');
        // };

        page.querySelector('#cari-pelanggan').onclick = function () {
            document.querySelector('#myNavigator').pushPage('caripelanggan.html');
        };

        page.querySelector('#tombol-reservasi').onclick = function () {
            document.querySelector('#myNavigator').pushPage('reservasi.html');
        };

        page.querySelector('#tombol-cekIn').onclick = function () {
            Authenticate();
            let inputNama=$('#nama-checkin').val();
            $('#modal-checkin-submit').show();
            if (namacheckin != null && total > 0) {
                if (arrayPemesanan != null && checkinID != "-") {
                    for (i = 0; i < arrayPemesanan.length; i++) {
                        $.ajax({
                            method: 'post',
                            url: _URL + '?query=mutation{createDetailReservasi(header_reservasi_id:' + checkinID + ',  produk_id: ' + arrayPemesanan[i].produk_id + ', karyawan_id: ' + arrayPemesanan[i].karyawan_id + ') {header_reservasi_id}}',
                            success: function (data) {
                                console.log(data);
                            },
                            error: function (data) {
                                ons.notification.alert("data ke-" + i + " tidak berhasil dimasukan");
                                console.log(data);
                            }
                        });
                    }
                    updateStatusReservasi(refIDCheckin);
                    $('#modal-checkin-submit').hide();
                } else if (arrayPemesanan != null && checkinID == "-") {
                    console.log('Checkin Tamu berhasil');
                    $.ajax({
                        method: 'post',
                        url: _URL + '?query=mutation{' +
                            'createHeaderReservasi(tanggal_reservasi: "' + getTanggal() + ' ' + getWaktu() + '", username: "' + checkinUname + '", produk_id: ' + arrayPemesanan[0].produk_id + ', karyawan_id: ' + arrayPemesanan[0].karyawan_id + ') {' +
                            'id,tamu,kode}}',
                        success: function (data) {
                            console.log(data);
                            checkinID = data.data.createHeaderReservasi.id;
                            refIDCheckin= data.data.createHeaderReservasi.kode;
                            console.log(checkinID);
                            if (arrayPemesanan.length > 1) {
                                console.log(arrayPemesanan);
                                for (k = 1; k < arrayPemesanan.length; k++) {
                                    $.ajax({
                                        method: 'post',
                                        url: _URL + '?query=mutation{createDetailReservasi(header_reservasi_id:' + checkinID + ',  produk_id: ' + arrayPemesanan[k].produk_id + ', karyawan_id: ' + arrayPemesanan[k].karyawan_id + ') {header_reservasi_id}}',
                                        success: function (data) {

                                            console.log(data);

                                        },
                                        error: function (data) {
                                            ons.notification.alert("data ke-" + k + " tidak berhasil dimasukan");
                                            console.log(data);
                                        }
                                    });
                                }

                            }
                            // $('#modal-checkin-submit').hide();
                            terimaReservasi(refIDCheckin);
                            console.log(data);

                        },
                        error: function (data) {
                            ons.notification.alert("Koneksi Gagal ");
                            $('#modal-checkin-submit').hide();
                            console.log(data);
                        }
                    });
                }
                console.log('Checkin id sekarang' + checkinID);
                //     if(checkinID!="-"){


                // }else{
                //     ons.notification.alert('unknown error');
                // }

            }else if(namacheckin == null && total > 0 && inputNama!=null ){
                console.log('Checkin Tamu berhasil');
                let id="-"
                let nama=$('#nama-checkin').val();
                let username="tamu-"+nama;
                setDataCheckin(id, nama, username);
                $.ajax({
                    method: 'post',
                    url: _URL + '?query=mutation{' +
                        'createHeaderReservasi(tanggal_reservasi: "' + getTanggal() + ' ' + getWaktu() + '", username: "' + checkinUname + '", produk_id: ' + arrayPemesanan[0].produk_id + ', karyawan_id: ' + arrayPemesanan[0].karyawan_id + ') {' +
                        'id,tamu,kode}}',
                    success: function (data) {
                        console.log(data);
                        checkinID = data.data.createHeaderReservasi.id;
                        refIDCheckin= data.data.createHeaderReservasi.kode;
                        console.log(checkinID);
                        if (arrayPemesanan.length > 1) {
                            console.log(arrayPemesanan);
                            for (k = 1; k < arrayPemesanan.length; k++) {
                                $.ajax({
                                    method: 'post',
                                    url: _URL + '?query=mutation{createDetailReservasi(header_reservasi_id:' + checkinID + ',  produk_id: ' + arrayPemesanan[k].produk_id + ', karyawan_id: ' + arrayPemesanan[k].karyawan_id + ') {header_reservasi_id}}',
                                    success: function (data) {

                                        console.log(data);

                                    },
                                    error: function (data) {
                                        ons.notification.alert("data ke-" + k + " tidak berhasil dimasukan");
                                        console.log(data);
                                    }
                                });
                            }

                        }
                        // $('#modal-checkin-submit').hide();
                        terimaReservasi(refIDCheckin);
                        console.log(data);

                    },
                    error: function (data) {
                        ons.notification.alert("Koneksi Gagal ");
                        $('#modal-checkin-submit').hide();
                        console.log(data);
                    }
                });
            } else {
                $('#modal-checkin-submit').hide();
                ons.notification.alert('isi datanya dulu :)');
            }
        };



        page.querySelector('#tambah').onclick = function () {
            let jasa = document.getElementById("list-jasa");
            let textJasa = jasa.options[jasa.selectedIndex].text;
            let durasi = jasaData[jasa.selectedIndex].waktu;
            durasi = formatWaktuTerapi(durasi);
            let harga = parseInt(jasaData[jasa.selectedIndex].harga);
            let terapis = document.getElementById("list-terapis");
            let textTerapis = terapis.options[terapis.selectedIndex].text;
            let id_produk = parseInt(jasaData[jasa.selectedIndex].id);
            console.log(id_produk);
            let id_karyawan = parseInt(terapisData[terapis.selectedIndex].id);
            arrayPemesanan.push({ "id": angkaIterasi1, "produk_id": id_produk, "karyawan_id": id_karyawan });

            let listTambah = "<ons-list-item id='dataPesanan" + angkaIterasi1 + "' style='background-color: #ccffcf'><ons-row><ons-col width='29%'>" + textJasa + "</ons-col>" +
                "<ons-col width='18%'>" + harga + "</ons-col>" +
                "<ons-col width='18%'>" + textTerapis + "</ons-col>" +
                "<ons-col width='30%'></ons-col>" +
                " <ons-col width='5%'>" +
                "<ons-icon icon='ion-navicon, material:md-close-circle-o' onClick='deleteItem(" + angkaIterasi1 + "," + harga + ")'></ons-icon></ons-col></ons-row><ons-list-item";
            document.getElementById("list-item-jasa").innerHTML += listTambah;
            total = total + harga;
            document.getElementById("total-harga").innerHTML = numberWithCommas(total);
            angkaIterasi1++;
            console.log(arrayPemesanan);
        };

        tanggalHariIni = getTanggal();
        console.log('Tanggal :' + tanggalHariIni);




        //Event page Login  
    } else if (page.id === 'login') {
        page.querySelector('#user-masuk').onclick = function () {
            let username_input = $('#namaUser').val();
            let password_input = $('#passUser').val();
            $('#modal-login').show();
            Login(username_input, password_input);



            // document.querySelector('#myNavigator').pushPage('tab.html');
        };


        //Event page Reservasi
    } else if (page.id === 'reservasi') {
        page.querySelector('#list-daftar-reservasi').onclick = function () {
            document.querySelector('#myNavigator').popPage();
        };


        //Event page tab
    } else if (page.id === 'tab') {
        page.querySelector('#profil-kasir').onclick = function () {
            document.querySelector('#myNavigator').pushPage('profile.html');
        };
        page.querySelector('#logout-button').onclick = function () {
            let dialog = document.getElementById('logout-alert-dialog');

            if (dialog) {
                dialog.show();
            }

        };

        page.querySelector('#confirmLogout').onclick = function () {
            Logout();
        };

        //Event page profile
    } else if (page.id === 'profile') {




        //Event page caripelanggan
    } else if (page.id === 'caripelanggan') {
        page.querySelector('#search-tamu-list').onclick = function () {

            document.querySelector('#myNavigator').popPage();
        }




        //Event page checkout
    } else if (page.id === 'checkout') {
        page.querySelector('#list-tamu-checkout').onclick = function () {
            // document.querySelector('#myNavigator').pushPage('invoice.html');
        }




        //Event page invoice
    } else if (page.id === 'invoice') {
        page.querySelector('#buttonQR').onclick = function () {
            // try {
            //     document.querySelector('#myNavigator').pushPage('pageqr.html');
            // } catch (err) {
            //     ons.notification.alert(err);
            // }
            QRcode() 
                
        };

        $('#input-kode-voucher').on('change', function () {
            $('#input-kode-voucher').val
        });

        page.querySelector('#confirm').onclick = function () {
            Authenticate();
            let modal = document.querySelector('#modal-invoice');
            modal.show();
            
            for (i = 0; i < arrayPembayaran.length; i++) {
                printAsset += arrayPrintPesanan[i].string;
            }
            for (i = 0; i < arrayPrintTerapis.length; i++) {
                printAssetTerapis += arrayPrintTerapis[i].string;
            }
            console.log(arrayPrintPesanan);
            tunai = $('#input-tunai').val();
            tipePembayaran = $('input[name=tipePembayaran]:checked').val();
            console.log('Tipe Pembayaran:' + tipePembayaran);

            printSend = '' +
                'Tanggal :' + tanggalHariIni + '\n' +
                'Kode Struk :' + kodePembayaran + '\n' +
                'Nama Tamu :' + namaCheckout + '\n' +

                '================================ \n' +
                ' Nama Jasa \t \t Harga \n' +
                '-------------------------------- \n' +
                printAsset +
                '-------------------------------- \n' +
                'Terapis :\n' +
                printAssetTerapis +
                '================================ \n' +
                '\t \t Total :' + totalPembayaran + '\n' +
                '\t \t Tunai :' + tunai + '\n' +
                '\t \t Kembali :' + kembalian + '\n' +
                '\t \t Voucher :' + voucherValue + '\n \n';


            let printSendCopy = 'Copy' +
                'Tanggal :' + tanggalHariIni + '\n' +
                'Kode Struk :' + kodePembayaran + '\n' +
                'Nama Tamu :' + namaCheckout + '\n' +

                '================================ \n' +
                ' Nama Jasa \t \t Harga \n' +
                '-------------------------------- \n' +
                printAsset +
                '-------------------------------- \n' +
                'Terapis :\n' +
                printAssetTerapis +
                '================================ \n' +
                '\t \t Total :' + totalPembayaran + '\n' +
                '\t \t Tunai :' + tunai + '\n' +
                '\t \t Kembali :' + kembalian + '\n' +
                '\t \t Voucher :' + voucherValue + '\n \n';



            console.log(printSend);
            console.log(printSendCopy);

            if (arrayPembayaran > 0) {
                for (i = 0; i < arrayPembayaran.length; i++) {
                    $.ajax({
                        method: 'post',
                        url: _URL + '?query=mutation{createDetailReservasi(header_reservasi_id:' + checkinID + ',  produk: ' + arrayPembayaran[i].produk_id + ', karyawan_id: ' + arrayPembayaran[i].karyawan_id + ') {header_reservasi_id}}',
                        success: function (data) {

                            console.log(data);

                        },
                        error: function (data) {
                            ons.notification.alert("data ke-" + i + " tidak berhasil dimasukan");
                            console.log(data);
                        }
                    });

                }
            }


            $.ajax({
                method: 'post',
                url: _URL + '?query=mutation{ CreateHeader(ref_id:"' + refID + '", tanggal:"' + getTanggal() + ' ' + getWaktu() + '",jenis:"' + tipePembayaran + '",jumlah:"' + totalPembayaran + '",referensi:"-"){id,nomor,tanggal }}',
                success: function (data) {
                    let dataHeaderPembayaran = data.data.CreateHeader;
                    // let dataID = dataHeaderPembayaran.id;
                    console.log(data);
                    
                    try {

                        // BTPrinter.connect(function (data) {
                        //     console.log("Success");

                        // }, function (err) {
                        //     console.log("Error");

                        // }, "BlueTooth Printer");

                        BTPrinter.printText(function (data) {
                            ons.notification.alert("Print Success");
                            console.log(data)
                        }, function (err) {
                            console.log("Error");
                            
                        }, printSend);
                    } catch (err) {
                        console.log(err);
                    }

                    try {

                        // BTPrinter.connect(function (data) {
                        //     console.log("Success");

                        // }, function (err) {
                        //     console.log("Error");

                        // }, "BlueTooth Printer");

                        BTPrinter.printText(function (data) {
                            ons.notification.alert("Print Success");
                            console.log(data)
                        }, function (err) {
                            console.log("Error");
                            ons.notification.alert("Print gagal")
                        }, printSendCopy);
                    } catch (err) {
                        console.log(err);
                    }
                    // updateStatusReservasiCheckout();
                    ons.notification.alert('Checkout Berhasil');
                    deleteAllItemInvoice();
                    modal.hide();
                    document.querySelector('#myNavigator').popPage();
                },
                error: function (data) {
                    ons.notification.alert('Checkout Gagal coba lagi');
                    modal.hide();
                    document.querySelector('#myNavigator').popPage();
                    console.log(data);
                }
            });
        };

        page.querySelector('#tombol-print').onclick = function () {
            let tunai = $('#input-tunai').val();
            console.log('tunai :' + tunai + voucherValue);
            let loadingCircle = $("<div '>Menyambungkan ke printer...</div><div style='text-align:center;'><ons-progress-circular id='loading' style='text-align:center;' indeterminate></ons-progress-circular></div>");
            $('#print-gagal-notification').html(loadingCircle);
            // let modal = document.querySelector('#modal-invoice-printer');
            // modal.show();
            //untuk menyambungkan printer secara asyncronous
            setTimeout(function() {
                BTPrinter.connect(function (data) {
                    console.log(data);
                    console.log("Success");
                    $('#print-gagal-notification').html('Printer Tersambung');
                    
                }, function (err) {
                    console.log(err);
                    let notif = 'Printer Tidak Tersambung';
                    $('#print-gagal-notification').html(notif);
                    
                }, "BlueTooth Printer");
            }, 3500);
           
            if (tunai + voucherValue >= totalPembayaran) {
                       
                var dialog = document.getElementById('invoice-alert-dialog');
                if (dialog) {
                    dialog.show();
                }
            } else {
                ons.notification.alert("Pembayaran kurang");
            }

            // if (tunai + voucherValue >= totalPembayaran) {
            //     let dialog = document.getElementById('invoice-alert-dialog');

            //     if (dialog) {
            //         dialog.show();
            //     }
            // } else {
            //     ons.notification.alert("Pembayaran kurang");
            // }
        };


        //menambah data pesanan

        page.querySelector('#tambah-invoice').onclick = function () {
            try {
                let jasa = document.getElementById("list-jasa-invoice");
                let textJasa = jasa.options[jasa.selectedIndex].text;
                let harga = parseInt(jasaData[jasa.selectedIndex].harga);
                let id_produk = parseInt(jasaData[jasa.selectedIndex].id);
                let terapis = document.getElementById("list-terapis-invoice");
                let textTerapis = terapis.options[terapis.selectedIndex].text;
                let id_karyawan = parseInt(terapisData[terapis.selectedIndex].id);

                if (arrayPrintTerapis.length != 0) {
                    let contoh = ' ' + textTerapis + '\n';
                    for (i = 0; i < arrayPrintTerapis.length; i++) {
                        if (arrayPrintTerapis[i].string != contoh) {
                            arrayPrintTerapis.push({ "id": angkaIterasi2, "string": ' ' + textTerapis + '\n' });
                        }
                    }
                } else {
                    arrayPrintTerapis.push({ "id": angkaIterasi2, "string": ' ' + textTerapis + '\n' });
                }
                arrayPrintPesanan.push({ "id": angkaIterasi2, "string": ' ' + textJasa + '\t \t' + harga + '\n' });
                arrayPembayaran.push({ "id": angkaIterasi2, "produk_id": id_produk, "karyawan_id": id_karyawan });

                var listTambah = "<ons-list-item id='dataInvoice-" + angkaIterasi2 + "' style='background-color: #ccffcf'><ons-row><ons-col width='29%'>" + textJasa + "</ons-col>" +
                    "<ons-col width='18%'>" + harga + "</ons-col>" +
                    "<ons-col width='18%'>" + textTerapis + "</ons-col>" +
                    // "<ons-col width='10%'>1</ons-col>" +
                    "<ons-col width='30%'></ons-col> " +
                    "<ons-col width='5%'>" +
                    "<ons-icon icon='ion-navicon, material:md-close-circle-o' onClick='deleteItemInvoice(" + angkaIterasi2 + "," + harga + ")'></ons-icon></ons-col></ons-row><ons-list-item";
                document.getElementById("list-item-invoice").innerHTML += listTambah;
                totalPembayaran = totalPembayaran + harga;
                document.getElementById("total-harga-invoice").innerHTML = numberWithCommas(totalPembayaran);
                angkaIterasi2++;
                console.log(arrayPembayaran);

            } catch (err) {
                console.log(err);
            }
        };
        //penanggalan
    }
});



/*function validasi() {
    var nama = document.getElementById("namaUser").value;
    var pass = document.getElementById("passUser").value;
    if (nama == "" && pass == "") {
        return true;
    } else {
        alert('Anda harus mengisi data dengan lengkap !');
    }
}*/



//app.initialize();