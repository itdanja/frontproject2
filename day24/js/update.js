
document.addEventListener( 'DOMContentLoaded', function(){
    수정시기존데이터호출();
})


function 수정시기존데이터호출() {
    
    let fno = JSON.parse( localStorage.getItem( 'updatefno'  ) ) ;
    let feedList = JSON.parse( localStorage.getItem( 'feedList' ) );

    let feed = null;

    for( let i = 0 ; i<feedList.length ; i++ ){
        
        if( fno == feedList[i].fno){
            feed = feedList[i]; break;
        }
    }

    document.querySelector('textarea').value = `${ feed.fcontent.replaceAll('<br/>','\n') }`

}


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


function 피드수정(){
    // 1. 
    const textarea = document.querySelector('textarea').value;

    if( textarea.length <= 0  ){ alert('내용 입력해주세요'); return;}
    if( img== ``){ alert('사진을 등록해주세요'); return;}

    let fno = JSON.parse( localStorage.getItem( 'updatefno'  ) ) ;
    let feedList = JSON.parse( localStorage.getItem( 'feedList' ) );

    // 2. 
    let feed = null;
    for( let i = 0 ; i<feedList.length ; i++ ){
        
        if( fno == feedList[i].fno){
            feedList[i].fcontent = textarea.replaceAll( '\n' , '<br/>'),
            feedList[i].fimg = img;
            break;
        }
    }

    // 3. 
    localStorage.setItem( 'feedList' , JSON.stringify(feedList) );

    // 4.
    alert('피드 수정 완료')
    location.href="index.html";
}

