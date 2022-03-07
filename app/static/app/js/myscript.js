$('#slider1, #slider2, #slider3').owlCarousel({
    loop: true,
    margin: 20,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: false,
            autoplay: true,
        },
        600: {
            items: 3,
            nav: true,
            autoplay: true,
        },
        1000: {
            items: 5,
            nav: true,
            loop: true,
            autoplay: true,
        }
    }
})
$('.plus-cart').click(function(){
    var id =$(this).attr("pid").toString();
    var eml = this.parentNode.children[2]
    //console.log(id)
    $.ajax({
        type : "GET",
         url : "/pluscart",
         data :{
             proud_id : id
         },
         success: function (data){
             eml.innerText = data.quantity
             document.getElementById("amount").innerText = data.amount
             document.getElementById("totalamount").innerText = data.totalamount
         }
    })
})

$('.minus-cart').click(function(){
    var id =$(this).attr("pid").toString();
    var eml = this.parentNode.children[2]
    //console.log(id)
    $.ajax({
        type : "GET",
         url : "/minuscart",
         data :{
             proud_id : id
         },
         success: function (data){
             eml.innerText = data.quantity
             document.getElementById("amount").innerText = data.amount
             document.getElementById("totalamount").innerText = data.totalamount
         }
    })
})

$('.remove-cart').click(function(){
    var id =$(this).attr("pid").toString();
    var eml = this
    console.log(id)
    $.ajax({
        type : "GET",
         url : "/removecart",
         data :{
             proud_id : id
         },
         success: function (data){
             console.log("Delete")
             document.getElementById("amount").innerText = data.amount
             document.getElementById("totalamount").innerText = data.totalamount
             eml.parentNode.parentNode.parentNode.parentNode.remove()
         }
    })
})

$('.cancel-order').click(function(){
    var id =$(this).attr("pid").toString();
    var eml = this
    console.log(id)
    $.ajax({
        type : "GET",
         url : "/cancelorder",
         data :{
             op_id : id
         },
         success: function (data){
             console.log("Delete")
            eml.parentNode.parentNode.parentNode.remove()
         }
    })
})
// console.log("haha")
// var user=prompt("hi user");
// //alert("hello");
// console.log(user);


// function addLeadingZero(number) {
//     if(number < 10){
//         return "0" + number.toString();
//     }
//     else{
//         return number.toString();
//     }
// }

// window.setInterval(function (){

//     var currentTime = new Date();
    
//     var hours = currentTime.getHours();
//     var minutes = currentTime.getMinutes();
//     var seconds = currentTime.getSeconds();
    
//     document.getElementById('hours').innerHTML = addLeadingZero(hours);
//     document.getElementById('minutes').innerHTML = addLeadingZero(minutes);
//     document.getElementById('seconds').innerHTML = addLeadingZero(seconds);
// },1000)

// document.getElementById('relogio').style.color='white';

$('.modal').animate({
    marginLeft: "+=200px",
    marginTop: "+=13px",
    height:500
});

$('#searchBar1').keyup(function(){
    
    var name = $("#searchBar1").val()
    $('.modal').show();
    console.log(name);
    if(name.trim().length > 0){
        $.ajax({
            url: "/search",
            type:"POST",
            data: {
                name:name
            },
            success: function(data){
                $('#table-body').html("");
                console.log(data);
                $.each(data,function(key,item) {
                    console.log("/product-detail/"+item.id);
                    // $('#table-body').append('<a href="/product-detail/'+item.id+'" class=btn>\
                    //         <tr>\
                    //         <td><img class=photo-resize src= "http://127.0.0.1:8000/media/' + item.product_image + '"></td>\
                    //         <td>'+item.title+'</td>\
                    //     </tr></a>'
                    // )
                    $('#table-body').append('<tr class=table-row data-href="/product-detail/'+item.id+'">\
                    <td><img class=photo-resize src= "http://127.0.0.1:8000/media/' + item.product_image + '"></td>\
                    //         <td>'+item.title+'</td>\
                    </tr>')
                });
                $(".photo-resize").width(40).height(70);
            },
            error: function(){
                console.log("error in code")
            } 
        })
    }else{
        $('.modal').hide();
    }
    
});

$('#modal-close').click(function(){
    $('#searchBar1').val("");
    $('.modal').hide();
});

$(document).ready(function($) {
    $(".table-row").click(function() {
        window.document.location = $(this).data("href");
    });
});