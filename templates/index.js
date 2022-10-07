  
  function onClickedPredictCrop() {
    console.log("Predict crop clicked");
    var N = document.getElementById("uiN").value;
    var P = document.getElementById("uiP").value;
    var K = document.getElementById("uiK").value;
    var Temp = document.getElementById("uiTemperature").value;
    var Humidity = document.getElementById("uiHumidity").value;
    var ph = document.getElementById("uipH").value;
    var rainfall = document.getElementById("uiRainfall").value;
    
    var predCrop = document.getElementById("uiPredictedCrop");
    var cropImage = document.getElementById("uiCropImage");
    var url = "http://127.0.0.1:5000/predict_crop";   
    $.post(url, {
        Nitrogen : N,
        Phosporus: P,
        Potassium: K,
        Temperature : Temp,
        Humidityy : Humidity,
        pH : ph,
        rainFall : rainfall
    },function(data, status) {
        console.log(data.predicted_crop);
        predCrop.innerHTML = "Recommended Crop : " + data.predicted_crop ;
        cropImage.src="./Images/crop/"+data.predicted_crop+".jpg";
        formCard.style.display=none;
        console.log(status);
    });
  }
  

  function onClickedPredictFert() {
    console.log("Predict crop clicked");
    var Temp = document.getElementById("uiTemperature").value;
    var Humidity = document.getElementById("uiHumidity").value;
    var Moisture = document.getElementById("uiMoisture").value;
    var SoilType = document.getElementById("uiSoilType").value;
    var CropType = document.getElementById("uiCropType").value;
    var N = document.getElementById("uiN").value;
    var P = document.getElementById("uiP").value;
    var K = document.getElementById("uiK").value;
    
    var predFert = document.getElementById("uiPredictedFert");
    var fertImage = document.getElementById("uiFertImage");

    var url = "http://127.0.0.1:5000/predict_fert"; 

    $.post(url, {
        Temperature : Temp,
        Humidityy : Humidity,
        Moisture : Moisture,
        SoilType:SoilType,
        CropType:CropType,
        Nitrogen : N,
        Phosporus: P,
        Potassium: K
    },function(data, status) {
        console.log(data.predicted_fert);
        predFert.innerHTML = "Recommended Fertilizer :" + data.predicted_fert ;
        fertImage.src="./images/fert/fert" + data.predicted_fert.replaceAll("-","") + ".jpg";
        console.log(status);
    });
  }



  function readURL(input) {
    if (input.files && input.files[0]) {
  
      var reader = new FileReader();
  
      reader.onload = function(e) {
        $('.image-upload-wrap').hide();
  
        $('.file-upload-image').attr('src', e.target.result);
        $('.file-upload-content').show();
  
        $('.image-title').html(input.files[0].name);
      };
  
      reader.readAsDataURL(input.files[0]);
  
    }
  }

  function onClickPredictDisease(){
    console.log("Predict Disease clicked");
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    
    
    formData.append('input_image', fileField.files[0]);
    fetch('http://127.0.0.1:5000/predict_disease', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      document.getElementById("uiPredictedDisease").innerHTML=result.output_disease;
    })
    .catch(error => {
      console.error('Error:', error);
    });


    // var inputImage = document.getElementById("input_image");

    // var url = "http://127.0.0.1:5000/predict";
    // $.post(url, {
    //     input_image : inputImage,
    // },function(data, status) {
    //     console.log(data.output_disease);
    //     console.log(data.confidence)

    //     console.log(status);
    // });

  }
  