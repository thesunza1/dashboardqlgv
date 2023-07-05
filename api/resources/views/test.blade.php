<?php foreach ($cvcha as $row) {
    $result[] = array("id" => $row->cv_ten, "name" => $row->cv_tgthuchien, "email" => $row->cv_hanhoanthanh,"id1" => $row->cv_thgianhoanthanh, "name1" => $row->cv_trangthai, "email1" => $row->cv_tiendo);
    
} 

?>


    
<form method="get" action="/api/nhanvien">
    @csrf
    <div className="">
      <div className="relative">
          
          <div className="absolute border-2 border-blue-700 bg-blue-500 w-[25rem] h-[20rem] rounded-xl top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 opacity-90">
              <div className="flex justify-center mt-4">
                  <h1 className="text-4xl font-bold text-white">Đăng nhập</h1>
                  @if (request('error'))
                  <p style="color: red;">{{ request('error') }}</p>
                  @endif
              </div>
              <div className="justify-center mt-4 ml-8">
                  <h2 className="text-xl font-bold text-white">id:</h2>
                  <input 
                      className="w-64 h-10 px-2 ml-4 mt-1 border border-black rounded-xl" 
                      type="text" 
                      id="id" name="id"
                      
                      placeholder="Tên tài khoản" 
                  />
              </div>
              <div className="justify-center mt-4 ml-8">
                  <h2 className="text-xl font-bold text-white">thang:</h2>
                  <input 
                      className="w-64 h-10 px-2 ml-4 mt-1 border border-black rounded-xl" 
                      type="password" 
                      id="thang" name="thang"
                     
                      
                      placeholder="Mật khẩu" 
                  />
              </div>
              <div className="flex justify-center mt-4">
                  <button 
                      className="text-2xl font-bold text-blue-700 w-40 h-12 px-2 ml-4 mt-1 border border-black rounded-xl bg-white hover:bg-black hover:text-white hover:border-black hover:shadow-2xl hover:scale-1" 
                      type="submit">Gửi
                  </button>
              </div>
          </div>
          <div className="absolute flex bg-blue-600 w-full h-[5rem] top-0">
              <div className="flex justify-center w-20 h-20 ml-80">
                 
              </div>
              <div className="flex justify-center text-center">
                  
              </div>
          </div>
      </div>
  </div>
  </form>




<table>
 
    <thead>
        <tr>
            <th>CVDG</th>
            <th>TGTH</th>
            <th>THCV</th>
            <th>TGHT</th>
            <th>TTCV</th>
            <th>TLHT</th>
            
        </tr>
    </thead>
    <tbody>
        <?php foreach($result as $row): 
            
        ?>

        <tr>
            <td><?= $row['id'] ?></td>
            <td><?= $row['name'] ?></td>
            <td><?= $row['email'] ?></td>
            <td><?= $row['id1'] ?></td>
            <td><?= $row['name1'] ?></td>
            <td><?= $row['email1'] ?></td>
            
            
        </tr>
        <?php endforeach ?>
    </tbody>
</table>