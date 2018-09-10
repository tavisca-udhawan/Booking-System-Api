Hotel = {};
var addHotel = () => {
    var name = $('#name').val();
    var price = $('#price').val();
    var address = $('#address').val();
    var rating = $('#rating').val();
    Hotel.Name = name;
    Hotel.Price = price;
    Hotel.Address = address;
    Hotel.StarRating = rating;
    HotelCall(Hotel);
}
var HotelCall = (Hotel) => {

    $.ajax({
        url: "/api/hotel/add",
        data: JSON.stringify(Hotel),
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        success: function (result) {
            console.log("success");

        },
        error: function (reason) {
            console.log("had a failure");
            console.log(reason);
        }
    }).done((response) => { appendData(response) });
};
User = {};
var isTrue = false;
var authenticate = () => {
    var username = $("#username").val();
    var password = $("#password").val();

    User.UserName = username;
    User.Password = password;

    ajaxCall(User);

};

var appendData = (response) => {
    $("#showResponse").append("<p>" + response.Id + "</p>")
}

var ajaxCall = (User) => {

    $.ajax({
        url: "/api/authenticate",
        data: JSON.stringify(User),
        type: 'POST',
        contentType: 'application/json',
      dataType: 'json',
        async: false,
        success: function (result) {
            console.log("success");
            if (result.UserType == 0)
                window.location.href = "AdminIndex.html";
            else if (result.UserType == 1)
                window.location.href = "UserIndex.html";
       },
        error: function (reason) {
            console.log("had a failure");
            console.log(reason);
        }
    }).done((response) => { appendData(response) });
};

//var GetHotel = () => {
//    var id = $("#hotelId").val();
//    HotelAjaxCall(id)
//}

var HotelBookAjaxCall = (id) => {
    var server = "/api/hotel/book/" + id;
    $.ajax({
        url: server,
        type: 'PUT',
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            console.log("success");
            console.log(result);
        },
        error: function (reason) {
            console.log("had a failure");
            console.log(reason);
        }
    }).done((response) => {
        alert("Booked");
    });
};

var HotelSaveAjaxCall = (id) => {
    var server = "/api/hotel/save/" + id;
    $.ajax({
        url: server,
        type: 'PUT',
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            console.log("success");
            console.log(result);
        },
        error: function (reason) {
            console.log("had a failure");
            console.log(reason);
        }
    }).done((response) => {
        alert("saved");
    });
};

var GetAllHotels = () => {

    HotelAllAjaxCall()
}
var HotelAllAjaxCall = () => {
    var server = "/api/hotel/get/";
    $.ajax({
        url: server,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            console.log("success");
            console.log(result);
        },
        error: function (reason) {
            console.log("had a failure");
            console.log(reason);
        }
    }).done((response) => {
        if (isTrue == false) {
            response.forEach((hotel) => {

                var book_id = "b" + hotel.Id;
                var save_id = "s" + hotel.Id;
                $("#hotels").append("<p>" + hotel.Name + " " + hotel.Price + " " + hotel.Address + " " + hotel.StarRating + "</p>");
                $("#hotels").append("<button class='btn' id=" + book_id + ">Book</button>");
                $("#hotels").append("<button class='btn' id=" + save_id + ">Save</button>");
                document.getElementById(book_id).addEventListener("click", () => {
                    HotelBookAjaxCall(hotel.Id);
                });
                document.getElementById(save_id).addEventListener("click", () => {
                        HotelSaveAjaxCall(hotel.Id);
                    });
                isTrue = true;

            });
        }
    });
};
//Car
//isTrue = false;
//var GetCar = () => {
//    var id = $("#hotelId").val();
//    CarAjaxCall(id)
//}

//var CarAjaxCall = (id) => {
//    var server = "/api/car/get/" + id;
//    $.ajax({
//        url: server,
//        type: 'GET',
//        contentType: 'application/json',
//        dataType: 'json',
//        success: function (result) {
//            console.log("success");
//            console.log(result);
//        },
//        error: function (reason) {
//            console.log("had a failure");
//            console.log(reason);
//        }
//    }).done((response) => {
//        $("#cars").append("<p>" + response.Name + "</p>")
//    });
//};


var GetAllCars = () => {

    CarAllAjaxCall()
}

var CarAllAjaxCall = () => {
    var server = "/api/car/get/";
    $.ajax({
        url: server,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            console.log("success");
            console.log(result);
        },
        error: function (reason) {
            console.log("had a failure");
            console.log(reason);
        }
    }).done((response) => {
        if (isTrue == false) {
            response.forEach((car) => {
                $("#cars").append("<p>" + car.Drop + " " + car.Pick + " " + car.DropDate + " " + car.PickDate + "</p>");
                $("#cars").append("<button id=" + car.Id + ">Book</button>");
                $("#cars").append("<button id=" + car.Id + ">Save</button>");
                isTrue = true;

            });
        }
    });
};

