
var theNewScript = document.createElement("script");
theNewScript.type = "text/javascript";
theNewScript.src = "data.json";
document.getElementsByTagName("head")[0].appendChild(theNewScript);

function getCriteria() {
    var internal = document.getElementById("internal").value;
    var eksternal = document.getElementById("eksternal").value;
    var distance = document.getElementById("distance").value;
    var rating = document.getElementById("rating").value;
    var price = document.getElementById("price").value;

    var bobots = [internal,eksternal,distance,rating,price];
    localStorage.setItem("bobots",JSON.stringify(bobots));
}

function getResult() {
    var internals = [];
    var externals = [];
    var prices = [];
    var locations = [];
    var ratings = [];

    //initial the internals array
    for (i = 0; i < data.length; i++) { 
        internals[i] = 0;
    }

    //initial the externals array
    for (i = 0; i < data.length; i++) { 
        externals[i] = 0;
    }

    //initial the locations array
    for (i = 0; i < data.length; i++) { 
        locations[i] = 0;
    }

    //initial the ratings array
    for (i = 0; i < data.length; i++) { 
        ratings[i] = 0;
    }

    //initial the prices array
    for (i = 0; i < data.length; i++) { 
        prices[i] = 0;
    }

    //INTERNAL FACILITIES
    //count the wifi points (internal facilities)
    for (i = 0; i < data.length; i++) { 
        if(data[i].wifi=="true") {
            internals[i] += 8;
        }
        else {
            internals[i] += 4;
        }
    }

    //count the laundry points (internal facilities)
    for (i = 0; i < data.length; i++) { 
        if(data[i].laundry=="true") {
            internals[i] += 6;
        }
        else {
            internals[i] += 4;
        }
    }
    
    //count the sarapan points (internal facilities)
     for (i = 0; i < data.length; i++) { 
        if(data[i].breakfast=="true") {
            internals[i] += 7;
        }
        else {
            internals[i] += 5;
        }
    }

    //count the kolam points (internal facilities)
     for (i = 0; i < data.length; i++) { 
        if(data[i].kolam=="true") {
            internals[i] += 7;
        }
        else {
            internals[i] += 5;
        }
    }

    //EXTERNAL FACILITIES
    //count the mainan points (external facilities)
     for (i = 0; i < data.length; i++) { 
        if(data[i].mainan=="true") {
            externals[i] += 10;
        }
        else {
            externals[i] += 2;
        }
    }
    

    //count the tour points (external facilities)
    for (i = 0; i < data.length; i++) { 
        if(data[i].tour=="true") {
            externals[i] += 8;
        }
        else {
            externals[i] += 3;
        }
    }

    //count the bar points (external facilities)
    for (i = 0; i < data.length; i++) { 
        if(data[i].bar=="true") {
            externals[i] += 8;
        }
        else {
            externals[i] += 4;
        }
    }

    //LOKASI HOTEL
    //count the jarak transportasi points (lokasi hotel) 
    for (i = 0; i < data.length; i++) { 
        if(data[i].jaraktransport>0 && data[i].jaraktransport<3) {
            locations[i] += 8;
        }
        else if(data[i].jaraktransport>2 && data[i].jaraktransport<5) {
            locations[i] += 6;
        }
        else {
            locations[i] += 3;
        }
    }

    //count objek wisata points (lokasi hotel)
    for (i = 0; i < data.length; i++) { 
        if(data[i].jaraktransport>0 && data[i].jaraktransport<4) {
            locations[i] += 8;
        }
        else if(data[i].jaraktransport>3 && data[i].jaraktransport<7) {
            locations[i] += 5;
        }
        else {
            locations[i] += 3;
        }
    }

    //count jarak dengan pusat oleh-oleh (lokasi hotel)
    for (i = 0; i < data.length; i++) { 
        if(data[i].jaraktransport>0 && data[i].jaraktransport<3) {
            locations[i] += 9;
        }
        else if(data[i].jaraktransport>2 && data[i].jaraktransport<5) {
            locations[i] += 6;
        }
        else {
            locations[i] += 4;
        }
    }

    //RATING HOTEL
    //count review hotel points (rating hotel)
    for (i = 0; i < data.length; i++) { 
        if(data[i].review<10) {
            ratings[i] += 5;
        }
        else if(data[i].review>9 && data[i].review<16) {
            ratings[i] += 7;
        }
        else {
            ratings[i] += 8;
        }
    }

    //count prestasi hotel points (rating hotel)
    for (i = 0; i < data.length; i++) { 
        if(data[i].prestasi>0 && data[i].prestasi<3) {
            ratings[i] += 4;
        }
        else if(data[i].prestasi>2 && data[i].prestasi<5) {
            ratings[i] += 6;
        }
        else {
            ratings[i] += 8;
        }
    }

    //HARGA
    //count harga kamar points (harga)
    for (i = 0; i < data.length; i++) { 
        if(data[i].hargakam>499 && data[i].hargakam<1001) {
            prices[i] += 10;
        }
        else if(data[i].hargakam>1000 && data[i].hargakam<1501) {
            prices[i] += 7;
        }
        else {
            prices[i] += 4;
        }
    }

    //count harga sarapan points (harga)
    for (i = 0; i < data.length; i++) { 
        if(data[i].hargasar>69 && data[i].hargasar<101) {
            prices[i] += 7;
        }
        else if(data[i].hargasar>100 && data[i].hargasar<151) {
            prices[i] += 5;
        }
        else {
            prices[i] += 3;
        }
    }

    // for (i = 0; i < data.length; i++) { 
    //     console.log("jarak sebelum pake basis", locations[i])
    // }


    //change the array value for normalisation
    internals = basisProfit(internals);
    externals = basisProfit(externals);
    locations = basisProfit(locations);
    ratings = basisProfit(ratings);
    prices = basisProfit(prices);


    //for (i = 0; i < data.length; i++) { 
    //    console.log("jarak sesudag pake basis biaya", locations[i])
    //}

    //get all the values from user's input
    // internal = internal.value;
    // eksternal = eksternal.value;
    // distance = distance.value;
    // rating = rating.value;
    // price = price.value;

    var bobots = localStorage.getItem("bobots");
    // console.log("bobots",bobots)
    //put all the bobot from user's input to the array
    // bobots = [internal,eksternal,distance,rating,price];
    bobots = JSON.parse(bobots);
    for (i = 0; i < 5; i++) {
        console.log("isi bobots ", bobots[i])
    }

    //normalisasi bobot
    bobots = basisBiaya(bobots);

    //count the final result
    var res = [];
    var hotels = [];
    for (i = 0; i < data.length; i++) {
        res[i] = (internals[i]*bobots[0]) + (externals[i]*bobots[1]) + (locations[i]*bobots[2]) + (ratings[i]*bobots[3]) + (prices[i]*bobots[4]);
        hotels[i] = res[i];
        // console.log("hotels ke ", res[i])
    }

    //get the top 3 result
    res = res.sort();
    // console.log("pertama ",res[9])
    // console.log("kedua ", res[8])
    // console.log("ketiga ", res[7])

    var pemenang = [];
    for (i = 0; i < data.length; i++) {
        // console.log("hotel i", hotels[i])
        if (res[9]==hotels[i]) {
            // console.log("pemenang pertama adalah hotel: ", data[i].name)
            pemenang[0] = i;
        }
        else if(res[8]==hotels[i]) {
            // console.log("pemenang kedua: ", data[i].name)
            pemenang[1] = i;
        }
        else if(res[7]==hotels[i]) {
            // console.log("pemenang ketiga: ", data[i].name)
            pemenang[2] = i;
        }
    }

    localStorage.setItem("pemenang",JSON.stringify(pemenang));
    // return pemenang;

    // console.log("internal", internal)
    // console.log("external", eksternal)
    // console.log("location", distance)
    // console.log("rating", rating)
    // console.log("price", price)
}

function basisProfit(arr) {
    var max = -Infinity;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    for (i = 0; i < arr.length; i++) {
        arr[i] = (arr[i]/max)*100;
    }

    return arr;
}

function basisBiaya(arr) {
    var min = Infinity;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }

    for (i = 0; i < arr.length; i++) {
        arr[i] = (min/arr[i])*100;
    }

    return arr;
}
