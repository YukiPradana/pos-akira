var _URL = 'http://7800f2a2.ngrok.io/graphql'


var _URL_DAFTAR_TAMU = _URL + '?query={users{id,nama,username}}';

var _URL_DAFTAR_RESERVASI = _URL + '?query={headerReservasi {id,tanggal_reservasi,tamu,kode}}';
var _URL_DAFTAR_RESERVASI_CHECKEDIN = _URL + '?query={statusReservasi(progress: "checkin") {' +
  'tanggal,' +
  'header_reservasi_id {' +
  'id,' +
  'tanggal_reservasi,' +
  'tamu,' +
  'kode,' +
  '}}}';
var _URL_DETAIL_RESERVASI = _URL + '?query={headerReservasi {id,tanggal_reservasi,tamu,kode, detail_reservasi {' +
  'durasi,' +
  'produk,' +
  'terapis,' +
  'header_reservasi_id,' +
  '}}}';


var _URL_DETAIL_STRUK = _URL + '?query={headerReservasi {id, detail_reservasi {' +
  'durasi,' +
  'produk,' +
  'terapis,' +
  'header_reservasi_id,' +
  '}}}';


var _URL_PRODUK_DAN_KARYAWAN = _URL + '?query={produk{id,nama,kode,harga,waktu}KaryawanQuery{id,nama,jenis_kelamin}}';


var _URL_KARYAWAN = _URL + '?query={KaryawanQuery{id,nama}}';
// var _URL_TERAPIS=_URL+'?query={terapis{id,nama,status}}';
var _URL_PRODUK = _URL + '?query={produk{id,nama,kode,harga,waktu}}';

var _URL_DAFTAR_RESERVASI_DITERIMA=_URL+'?query={statusReservasi(progress: "konfirm") {tanggal,header_reservasi_id {'+
      'id,'+
      'tanggal_reservasi,'+
      'tamu,'+
      'kode'+    
      '}}}';

      