async function getComment()
{
    const reponse = await fetch("https://comseba-introduce-ti0m.onrender.com/comment");
    const jsonData = await reponse.json();
    return jsonData;
}
const postComment=async (param)=>
{
    console.log(param);
    const res=await await fetch("https://comseba-introduce-ti0m.onrender.com/createcomment",
    {
        method: "POST",
        headers:
        {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(param),
    });
    return await res.json();
};
getComment();
const makeComment = async()=>
{
    const db=await getComment();
    const commentArea=document.querySelector(".guest_comment-area");
    const htmlList= db.commentList.map((info)=>
    {
        const date=info.time.split("-");
        const time=new Date(...date);
        const curTime=new Date();
        console.log(time,curTime);
        const timeStr=elapsedTime(time,curTime);
        return `<div class="guest_comment">
            <div class="guest_comment_left">
                <div class="guest_comment_left_name">${info.name}</div>
            </div>
            <div class="guest_comment_right">
                <div class="guest_comment_right_text">${info.comment}</div>
                <div class="guest_comment_right_time">${timeStr}</div>
            </div>
        </div>`;
    });
    const html=htmlList.reduce((a,c)=>a+c,"");
    commentArea.innerHTML=html;
};
const elapsedTime=(start,end)=>
{
    const diff=(end-start)/1000;
    const times=
    [
        {name: "년",milliSeconds: 60*60*24*365},
        {name: "개월",milliSeconds: 60*60*24*30},
        {name: "일",milliSeconds: 60*60*24},
        {name: "시간",milliSeconds: 60*60},
        {name: "분",milliSeconds: 60}
    ];
    for(const value of times)
    {
        const betweenTime=Math.floor(diff/value.milliSeconds);
        if(betweenTime>0)
        {
            return `${betweenTime}${value.name}`
        }
    }
    return "방금 전";
}
makeComment();

const commentBtn=document.querySelector(".guest_form button");
commentBtn.addEventListener("click",async (e)=>
{
    e.preventDefault();
    const name=document.querySelector(".guest_form input");
    const comment=document.querySelector(".guest_form textarea");
    const time= new Date();
    const timeStr=`${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}-${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}`;
    console.log(name.value,comment.value,timeStr);
    const state=await postComment({
        name: name.value,
        comment: comment.value,
        time:timeStr,
    });
    console.log(state);
    if(state)
    {
        window.location.reload();
    }
});