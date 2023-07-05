<form method="POST" action="/api/dashboardqlcv/">
    @csrf
    <input type="text" name="nv_taikhoan" placeholder="Tài khoản"><br><br>
    <input type="password" name="nv_matkhau" placeholder="Mật khẩu"><br><br>
    <button type="submit">Đăng nhập</button>
</form>