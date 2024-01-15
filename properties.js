angular.module("myApp", []).controller("myCtrl", [
  "$scope",
  function ($scope) {
  

    var selectedFile = document.getElementById("files");

    var chooseFile = document.querySelector("choose-file");

    var imgPreview = document.getElementById("img-preview");


    function dataURLToBlob(dataURL) {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
  }

    // Add an event listener to handle file selection
    selectedFile.addEventListener("change", function (event) {
      // Use $scope.$apply() to update AngularJS bindings
      $scope.$apply(function () {
        // Assign the selected files to the $scope variable
        $scope.fileList = event.target.files;
        //getImgData($scope.fileList);
        console.log(event.target.files[0]);
        var selectedFile = event.target.files[0];
        // Check if a file was selected
        if (selectedFile) {
          // Create a FileReader
          const reader = new FileReader();

          reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            console.log(e.target.result,'test');


            img.onload = function () {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                const context = canvas.getContext('2d');
                context.drawImage(img, 0, 0);

                // Convert the image to PNG by using the "toDataURL" method
                const pngDataUrl = canvas.toDataURL('image/png');

                $scope.$apply(function(){
                  $scope.imageData = pngDataUrl;
                  $scope.convertedBlob =  dataURLToBlob(pngDataUrl)
                  console.log($scope.imageData)
                })

              

                console.log(pngDataUrl)

                // Display the converted PNG image
                //outputImage.src = pngDataUrl;
            };
        };

        // Read the selected JPG file
        reader.readAsDataURL(selectedFile);
  
        }
      });
    });

    $scope.downloadPNG = function() {
      if ($scope.convertedBlob) {
          // Create a link element
          const link = document.createElement('a');

          // Set the href attribute to a data URL representing the Blob
          link.href = URL.createObjectURL($scope.convertedBlob);

          // Set the download attribute with a desired file name
          link.download = 'converted_image.png';

          // Append the link to the document
          document.body.appendChild(link);

          // Trigger a click on the link
          link.click();

          // Remove the link from the document
          document.body.removeChild(link);
      }
  }

  },
]);
