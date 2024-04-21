angular.module("myApp", []).controller("myCtrl", [
  "$scope",
  function ($scope) {
    getRedditData("programming", "devNewsData");
    getRedditData("technology", "techData");

    function getRedditData(subreddit, scopeName) {
      $scope.htmlValue = "HELLO";
      var path = "https://www.reddit.com/r/" + subreddit + ".json";
      console.log(path);
      axios.get(path).then(
        (response) => {
          var result = response.data;

          getData(result, scopeName);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    function getData(value, name) {
      $scope.$apply(function () {
        $scope[name] = value.data.children;
        $scope[name].shift();
        console.log(value.data.children, $scope[name]);
      });
    }

    $scope.cardContent = [
      {
        name: "Image Convention",
        icon: "fa fa-file-image-o",
        description:
          "Seamlessly convert images online with PNG, JPG, GIF, WEBP, HEIC support",
      },
      {
        name: "PDF convention",
        icon: "fa fa-file-pdf-o",
        description:
          "Access all in one tool to read, edit, compress, combine, convert and remove pages from PDF",
      },
      {
        name: "Base 64 Conversion",
        icon: "fa fa-key",
        description:
          "Our user-friendly site provides easy Base64 encoding and decoding tools.",
      },
      {
        name: "JSON Conversion",
        icon: "fa fa-file-code-o",
        description:
          "Utilize a web tool to view, edit, format, repair, and share JSON data",
      },
    ];
    console.log($scope.cardContent);

    $scope.ourServices = [
        { name: 'HTML Viewer', title: '', href: 'htmlViewer.html' },
        { name: 'JS Complier', title: '', href: 'jsComplier.html' },
        { name: 'Image Conversion', title: '', href: '#' },
        { name: 'JSON Conversion', title: '', href: '#' },
        { name: 'Iframe Checker', title: '', href: '#' },
        { name: 'PDF Conversion', title: '', href: '#' },
        { name: 'PDF Editor', title: '', href: '#' },
        { name: 'Resume Creation', title: '', href: '#' },
        { name: 'Array Maniplation', title: '', href: '#' },
        { name: 'XML Conversion', title: '', href: '#' },
        { name: 'Image Editor', title: '', href: '#' },
        { name: 'Video Editor', title: '', href: '#' },
        { name: 'Audio Editor', title: '', href: '#' },
        { name: 'Meme Generator', title: '', href: '#' },
        { name: 'Base64 Conversion', title: '', href: '#' },
        { name: 'Text To Viedo', title: '', href: '#' },
        { name: 'Viedo To GIF', title: '', href: '#' }
      ]
    console.log($scope.cardContent);

    $scope.imageData = "";

    // var selectedFile = document.getElementById("files");

    // var chooseFile = document.querySelector("choose-file");

    // var imgPreview = document.getElementById("img-preview");

    function dataURLToBlob(dataURL) {
      const arr = dataURL.split(",");
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
    // selectedFile.addEventListener("change", function (event) {
    //   // Use $scope.$apply() to update AngularJS bindings
    //   $scope.$apply(function () {
    //     // Assign the selected files to the $scope variable
    //     $scope.fileList = event.target.files;
    //     //getImgData($scope.fileList);
    //     console.log(event.target.files[0]);
    //     var selectedFile = event.target.files[0];
    //     // Check if a file was selected
    //     if (selectedFile) {
    //       // Create a FileReader
    //       const reader = new FileReader();

    //       reader.onload = function (e) {
    //         const img = new Image();
    //         img.src = e.target.result;
    //         console.log(e.target.result,'test');

    //         img.onload = function () {
    //             const canvas = document.createElement('canvas');
    //             canvas.width = img.width;
    //             canvas.height = img.height;

    //             const context = canvas.getContext('2d');
    //             context.drawImage(img, 0, 0);

    //             // Convert the image to PNG by using the "toDataURL" method
    //             const pngDataUrl = canvas.toDataURL('image/png');

    //             $scope.$apply(function(){
    //               $scope.imageData = pngDataUrl;
    //               $scope.convertedBlob =  dataURLToBlob(pngDataUrl)
    //               console.log($scope.imageData)
    //             })

    //             console.log(pngDataUrl)

    //             // Display the converted PNG image
    //             //outputImage.src = pngDataUrl;
    //         };
    //     };

    //     // Read the selected JPG file
    //     reader.readAsDataURL(selectedFile);

    //     }
    //   });
    // });

    $scope.downloadPNG = function () {
      if ($scope.convertedBlob) {
        // Create a link element
        const link = document.createElement("a");

        // Set the href attribute to a data URL representing the Blob
        link.href = URL.createObjectURL($scope.convertedBlob);

        // Set the download attribute with a desired file name
        link.download = "converted_image.png";

        // Append the link to the document
        document.body.appendChild(link);

        // Trigger a click on the link
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
      }
    };
  },
]);

angular.module("htmlApp", []).controller("htmlCtrl", [
  "$scope",
  function ($scope) {
    $scope.htmlValue = "";
    $scope.displayTextArea = false;
    $scope.formattedOut = "";

    $scope.viewHtml = function () {
      $scope.displayTextArea = false;
      $scope.formattedOut = "";
      document.getElementById("htmlData").innerHTML = $scope.htmlValue;
    };

    $scope.formatHtml = function (html) {
      $scope.displayTextArea = true;
      const formattedHTML = html_beautify(html);
      console.log(formattedHTML);
      document.getElementById("htmlData").innerHTML = "";
      $scope.formattedOut = formattedHTML;
      // document.getElementById('formattedOutput').value = formattedHTML
    };

    $scope.minifyHTML = function (html) {
      $scope.displayTextArea = true;
      const minifiedHtml = html
        .replace(/[\r\n\t]/g, " ")
        .replace(/<!--.*?-->/g, "")
        .replace(/\s{2,}/g, " ")
        .replace(/>\s+</g, "><");
      console.log(html, minifiedHtml);
      document.getElementById("htmlData").innerHTML = "";
      console.log(document.getElementById("formattedOutput"));
      $scope.formattedOut = minifiedHtml;
      // document.getElementById('formattedOutput').value = minifiedHtml
    };

    $scope.copyContent = function () {
      // Get the text fiel

      // Copy the text inside the text field
      navigator.clipboard.writeText($scope.formattedOut);

      // Alert the copied text
      alert("Copied the text: ");
    };
  },
]);

angular.module("base64app", []).controller("base64", [
  "$scope",
  function ($scope) {
    $scope.base64UserValue = "";
    $scope.conversionType = "file";

    $scope.test = function () {
      console.log($scope.conversionType);
    };

    $scope.encodeDecodeBase64 = function (type) {
      console.log(type, $scope.base64UserValue);
      $scope.base64ConvertedValue =
        type == "encode"
          ? window.btoa($scope.base64UserValue)
          : window.atob($scope.base64UserValue);
    };
  },
]);
