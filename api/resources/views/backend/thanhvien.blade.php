@if (session('id'))
    <p>Xin chào, {{ session('id') }}!</p>
@endif