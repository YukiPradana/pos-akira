var _STORAGE = window.localStorage;
var _TOKEN = '';
var _EXPIRED_DATE_TOKEN;
var _NAMA_USER;
var _ID_USER;
var _USERNAME;
var _JENIS_KELAMIN;

function Login(uname, pass) {

    if (_STORAGE.getItem('token')) {     //Debug
        _STORAGE.removeItem('token');
    };

    $.ajax({
        method: 'post',
        url: _URL + '?query=mutation{ Authenticate(input: {username: "' + uname + '", password: "' + pass + '",fcm_token:""}) {' +
            'token,' +
            'user {' +
            'id,' +
            'nama,' +
            'username,' +
            'jenis_kelamin}}}',
        success: function (data) {

            console.log('Tersambung');
            console.log(data);
            if (data.data.Authenticate != null) {
                let dataAuth = data.data.Authenticate;
                _TOKEN = dataAuth.token;
                _NAMA_USER = dataAuth.user.nama;
                let anHour = (new Date().getTime()) + 3600000;
                _EXPIRED_DATE_TOKEN = anHour;
                _ID_USER = dataAuth.user.id;
                _USERNAME = dataAuth.user.username;
                _JENIS_KELAMIN=dataAuth.user.jenis_kelamin;
                // if(_STORAGE.getItem('token')){     //Debug
                //     _STORAGE.removeItem('token');
                // };
                // console.log('Token :' + _TOKEN);
                // console.log('User :' + _NAMA_USER);
                _STORAGE.setItem('token', _TOKEN);
                _STORAGE.setItem('nama_user', _NAMA_USER);
                _STORAGE.setItem('expired_date_token', _EXPIRED_DATE_TOKEN);
                _STORAGE.setItem('id_user', _ID_USER);
                _STORAGE.setItem('username', _USERNAME);
                _STORAGE.setItem('jenis_kelamin', _JENIS_KELAMIN);
                console.log(_STORAGE.getItem('token'));
                if (_STORAGE.getItem('token')) {
                    document.querySelector('#myNavigator').replacePage('tab.html');
                }

            } else {
                ons.notification.alert('Username atau Password salah');
            }
            $('#modal-login').hide();
        },
        error: function (data) {

            console.log(data);
            alert(data.status);
            $('#modal-login').hide();
        }

    });


    console.log(_STORAGE.getItem('token'));


}

function Logout() {

    _STORAGE.removeItem('token');
    _STORAGE.removeItem('nama_user');
    _STORAGE.removeItem('expired_date_token');
    _STORAGE.removeItem('id_user');
    _STORAGE.removeItem('username');
    _STORAGE.removeItem('jenis_kelamin');
    document.querySelector('#myNavigator').resetToPage('login.html');

}



function Authenticate() {
    if (localStorage.getItem('token')) {
        console.log('Authenticated');
        let expired_date = parseInt(localStorage.getItem('expired_date_token'));
        let date_now = new Date().getTime();
        if (date_now > expired_date) {
            ons.notification.alert('Session berakhir, harus login ulang');
            Logout();
        }
    } else {
        Logout();
    }
}

function LoginAuthenticate() {
    if (localStorage.getItem('token')) {
        let expired_date = parseInt(localStorage.getItem('expired_date_token'));
        let date_now = new Date().getTime();
        console.log('Expired date: ' + localStorage.getItem('expired_date_token'));
        console.log('Date now : ' + date_now);
        if (date_now < expired_date) {
            _TOKEN = localStorage.getItem('token');
            _NAMA_USER = localStorage.getItem('nama_user');
            _EXPIRED_DATE_TOKEN = expired_date;
            _ID_USER = localStorage.getItem('id_user');
            _USERNAME = localStorage.getItem('username');
            _JENIS_KELAMIN=localStorage.getItem('jenis_kelamin');
            document.querySelector('#myNavigator').pushPage('tab.html');
        } else {
            ons.notification.alert('Session berakhir, harus login ulang');
            _STORAGE.removeItem('token');
            _STORAGE.removeItem('nama_user');
            _STORAGE.removeItem('expired_date_token');
            _STORAGE.removeItem('id_user');
            _STORAGE.removeItem('username');
            _STORAGE.removeItem('jenis_kelamin');
            document.querySelector('#myNavigator').pushPage('login.html');
        }
    } else {
        document.querySelector('#myNavigator').pushPage('login.html');
    }
}

function getUser() {
    return localStorage.getItem('nama_user');
}

function getIDUser() {
    return _ID_USER;
}
function getJenisKelamin(){
    return _JENIS_KELAMIN;
}