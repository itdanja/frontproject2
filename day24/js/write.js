
let img = ``;

function 이미지등록(event){

    console.log( event );
    console.log( event.target.files );
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0] ); //파일을 읽는 메서드 
    console.log( reader );
    
    reader.onload = function () { 		
        document.querySelector('#img').src=`${ reader.result }`
        document.querySelector('#img').style.height =`200px`;
        img = reader.result;
    } 	 	
}

function 피드등록(){
    // 1. 
    const textarea = document.querySelector('textarea').value;
    const input = document.querySelector('input').value;

    
    if( input== ``){ alert('비밀번호를 입력해주세요'); return;}
    if( textarea.length <= 0  ){ alert('내용 입력해주세요'); return;}
    if( img== ``){ alert('사진을 등록해주세요'); return;}

    let feedList = JSON.parse( localStorage.getItem( 'feedList' ) );
    if( feedList == null ){ feedList = []; }

    // 2. 
    const feed = {
        fno : feedList.length >= 1 ? feedList[ feedList.length-1 ].fno+1 : 1,
        fimg : img ,
        fdate : new Date(),
        fcontent : textarea.replaceAll( '\n' , '<br/>'),
        fgood : 0 ,
        fbad : 0 ,
        fpwd : input,
    };
    console.log( feedList );
    feedList.push( feed );
    // 3. 
    localStorage.setItem( 'feedList' , JSON.stringify(feedList) );

    // 4.
    alert('피드 등록 완료')
    location.href="/day24/index.html";

}