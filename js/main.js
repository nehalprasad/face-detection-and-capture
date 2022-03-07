const video = document.getElementById("video")


Promise.allSettled([
   
    faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
    faceapi.nets.faceExpressionNet.loadFromUri("./models"),
  ]).then(startVideo);


function startVideo() {
    navigator.getUserMedia(
        {
            video: {} },
            stream => (video.srcObject = stream),
            err => console.error(err)
        
    );
}

let button = document.querySelector("button");

button.onclick = () => {
    
    download()
} 

function download() {

    let canvas = document.createElement('canvas')

    let ctx = canvas.getContext("2d")

    canvas.width = video.width

    canvas.height = video.height
    
    ctx.drawImage(video,150,150,100,100)

  
  
    // let a = document.createElement('a')

    //let a = canvas.toDataURL()

    let image_data_url = canvas.toDataURL("image/jpeg");
    dataurl = image_data_url;
    dataurl_container.style.display = "block";


    dataurl.download = 'image.jpeg'
     console.log(dataurl)

   // a.click()
}



video.addEventListener("playing", () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)

    const displaySize = { width:video.width, height: video.height}
    faceapi.matchDimensions(canvas, displaySize)


    setInterval(async () => {
        const detections = await faceapi.detectSingleFace(
            video,
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
        

        const resizedDetections = faceapi.resizeResults(detections,displaySize);


        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);


       faceapi.draw.drawDetections(canvas, resizedDetections);
  //     faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//   faceapi.draw.drawFaceExpression(canvas, resizedDetections);

    }, 100);


});



// $(function () {

//   let save_container = document.querySelector("#save_container");
//   let saveImage = document.querySelector("#save_image"); // save image


//   saveImage.style.display = "none";


//   save_container.style.display = "block";
//       saveImage.style.display = "block";

//   saveImage.addEventListener("click", function () {
//     // console.log("INSIDE SAVE Button");
//     // for local
//     // let base_uri = "http://127.0.0.1:8000"
//     // for server
//     let base_uri = "https://face.covitor.ai"
//     $.ajax({
//       type: 'POST',
//       url: "/saveImage",
//       data: {
//         'image': dataurl.value,
//         'nn_code': document.getElementById("nn_code").value,
//         'csrfmiddlewaretoken': '6kshnvtVLdjfZly3WzRTR5xQiYs9h1PkUXfMB80CKoI4zQor8WLlVNYmsxJ9jbR7'
//       },
//       success: function (response) {
//         console.log(response);
//         if (response == "Success") {
//           window.location.href = base_uri+'/selfie';
//         } else {
//           alert("Image Not saved");
//         }
//       },
//       error: function (jqXHR, textStatus, errorThrown) {
//         console.log(textStatus, errorThrown);
//       }
//     });
//   });

// })