document.addEventListener( 'DOMContentLoaded' , function(){
    모든피드출력();
})
let feedList = [
    { 
        fno : 1,
        fimg : '여행2.webp',
        fdate : '2023-12-27',
        fcontent : `방탄소년단이 'BTS 2019 SUMMER PACKAGE in KOREA' 촬영으로 다녀온✨ <br/>
        전라북도 완주에 위치한 이곳은 작은 비밀공간을 지나면 볼 수 있는 갤러리부터 주변에 특색 있는 
        산책길까지 한 편의 수채화 같은 곳이기도 합니다. 주말 데이트로 #아원고택 어때요?`,
        fgood : 10 ,
        fbad : 9 
    },
    { 
        fno : 2,
        fimg : '여행.jpg',
        fdate : '2023-12-20',
        fcontent : `RM 따라 서울을 즐기는 방법😎<br /><br />
    
        동에 번쩍 서에 번쩍 대한민국 구석구석을 여행하는 #방탄소년단 #RM 을 따라 서울에서 전시보고, 
        한강에서 따릉이도 타는 #서울여행 어떤가요?🚶‍♂️✨마음의 평화가 찾아오는 힐링 여행이 될 거예요.`,
        fgood : 3 ,
        fbad : 2 
    },
    { 
        fno : 3,
        fimg : '여행3.png',
        fdate : '2023-12-19',
        fcontent : `방탄소년단이 'BTS 2019 SUMMER PACKAGE in KOREA' 촬영으로 다녀온✨ <br/>
        전라북도 완주에 위치한 이곳은 작은 비밀공간을 지나면 볼 수 있는 갤러리부터 주변에 특색 있는
         산책길까지 한 편의 수채화 같은 곳이기도 합니다. 주말 데이트로 #아원고택 어때요?`,
        fgood : 100 ,
        fbad : 21 
    }
]
let replyList = [
    {
        rno : 1 , 
        fno : 1 ,
        rcontent : `방탄소년단 너무 좋아요.` , 
        rdate : `2023-12-27` , 
    } ,
    {
        rno : 2 , 
        fno : 1 ,
        rcontent : `꼭 한번 놀러가보고 싶네요.` , 
        rdate : `2023-12-28` , 
    },
    {
        rno : 3 , 
        fno : 2 ,
        rcontent : `사진 너무 잘 나왔네요.` , 
        rdate : `2023-12-28` , 
    } ,
    {
        rno : 4 , 
        fno : 3 ,
        rcontent : `대한민국 구석구석.` , 
        rdate : `2023-12-28` , 
    } ,
    {
        rno : 5 , 
        fno : 3 ,
        rcontent : `서울여행 어떤가요? 마음의 평화가 찾아오는 힐링 여행` , 
        rdate : `2023-12-28` , 
    }
]

function 모든피드출력(){


    let feedList = JSON.parse( localStorage.getItem( 'feedList' ) );

    let html = ``;

    if( feedList == null ){return html;}

    for( let i = feedList.length-1 ; i>=0 ; i-- ){

        let feed = feedList[i];
        html +=  ` <div class="feed"> 
                        <div class="img"> <img src="${ feed.fimg }" /> </div>
                        <div class="content"> 
                            <div class="date"> ${ feed.fdate } </div>
                            ${ feed.fcontent }
                        </div>
                        
                        <div class="btnbox">
                            
                            <div>
                                <button type="button" onclick="피드수정으로이동(${feed.fno})">수정</button>
                                <button type="button" onclick="피드삭제(${feed.fno})">삭제</button>
                                <button onclick="onreply( ${feed.fno })" type="button">답글</button>
                            </div>
                            
                            <span style="font-size: 15px;">
                                <span onclick="upDown( ${feed.fno} , 1 ) "> 👍 ${ feed.fgood } </span>
                                <span onclick="upDown( ${feed.fno} , -1 ) "> 👎 ${ feed.fbad } </span>
                            </span>
                            
                        </div>
                        
                        <div class="replybox">
                            ${ 피드별댓글출력( feed.fno ) }
                        </div>
                        
                    </div>`

    }
    document.querySelector('.feedbox').innerHTML = html;

}

function 피드별댓글출력( fno ){

    let replyList = JSON.parse( localStorage.getItem( 'replyList' ) );
    
    let html = '';
    
    if( replyList == null ){return html;}

    for( let i = 0 ; i<replyList.length ; i++ ){

        let reply = replyList[i];
        if( reply.fno == fno ){
            html += `<div class="reply"> 
                        <span> ${ reply.rcontent } </span>
                        <div class="replyrignt">
                            <span> ${ reply.rdate } </span> 
                            <span> <button onclick="댓글삭제(${ reply.rno })"  type="button"> X </button> </span> 
                        </div>
                    </div>	`
        }
    }
    return html;
}

function 피드삭제( fno ){

    if( 패스워드검사( fno ) ){ return; }

    let feedList = JSON.parse( localStorage.getItem( 'feedList' ) );
    for( let i = 0 ; i<feedList.length ; i++ ){
        
        if( feedList[i].fno == fno ){
            feedList.splice( i , 1 ); alert('삭제되었습니다.'); 
            localStorage.setItem( 'feedList' , JSON.stringify(feedList) );
            모든피드출력();
            return;
        }
    }

}
function 피드수정으로이동( fno ){
    
    if( 패스워드검사( fno ) ){ return; }

    localStorage.setItem( 'updatefno' , JSON.stringify(fno) );
    location.href='/day24/update.html'
}

function 패스워드검사( fno ){
    
    const pwdConfirm = prompt('비밀번호 입력해주세요.');
    console.log( pwdConfirm );

    let feedList = JSON.parse( localStorage.getItem( 'feedList' ) );

    for( let i = 0 ; i<feedList.length ; i++ ){
        if( feedList[i].fno == fno && feedList[i].fpwd == pwdConfirm ){
            alert('패드워드일치');
            return false;
        }
    }
    alert('패스워드 불일치'); return true;
}

function upDown( fno , count   ){
    let feedList = JSON.parse( localStorage.getItem( 'feedList' ) );
    for( let i = 0 ; i<feedList.length ; i++ ){
        if( feedList[i].fno == fno ){
            feedList[i].fgood += count == 1 ? 1 : 0;
            feedList[i].fbad += count == -1 ? 1 : 0;
            
            console.log( feedList )
            localStorage.setItem( 'feedList' , JSON.stringify(feedList) );
            모든피드출력();
            return;
        }
    }
}

function onreply( fno ){

    const rcontent = prompt('답글 입력해주세요.');
    const rpwd = prompt('답글 비밀번호 입력해주세요.');

    let replyList = JSON.parse( localStorage.getItem( 'replyList' ) );
    if( replyList == null ){ replyList = []; }


    let reply = {
            rno : replyList.length >= 1 ? replyList[ replyList.length-1 ].rno+1 : 1 , 
            fno : fno ,
            rcontent : rcontent , 
            rdate : new Date() , 
            rpwd : rpwd
    }; console.log( reply );
    replyList.push( reply );
    // 3. 
    localStorage.setItem( 'replyList' , JSON.stringify(replyList) );
    모든피드출력();
}

function 댓글삭제( rno ){
    const pwdConfirm = prompt('비밀번호 입력해주세요.');

    let replyList = JSON.parse( localStorage.getItem( 'replyList' ) );

    for( let i = 0 ; i<replyList.length ; i++ ){
        if( replyList[i].rno == rno && replyList[i].rpwd == pwdConfirm ){
            alert('패드워드일치');

            replyList.splice( i , 1 ); alert('삭제되었습니다.'); 
            localStorage.setItem( 'replyList' , JSON.stringify(replyList) );
            모든피드출력();

            return false;
        }
    }
    alert('패스워드 불일치'); return true;
}