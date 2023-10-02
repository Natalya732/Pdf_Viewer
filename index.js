const url = "./Sample.pdf";

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load pdf file");
    }
    return response.arrayBuffer();
  })
  .then((pdfData) => {
    const pdfContainer = document.getElementById("pdf-container");

    pdfjsLib.getDocument(pdfData).promise.then((pdfDoc) => {
      let currentPage = 1;
      var scale = 1;
      document.getElementById("current_page").value = currentPage;
      const totalPages = pdfDoc.numPages;
      console.log("totalPages are", totalPages);
      renderPage(currentPage);

      // Function to render a specific page
      function renderPage(pageNumber) {
        pdfDoc.getPage(pageNumber).then((page) => {
          const canvas = document.getElementById("pdf-container");
          const context = canvas.getContext("2d");
          const viewport = page.getViewport({ scale: scale });
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          page.render(renderContext);
        });
      }

      document.getElementById("go_previous").addEventListener("click", (e) => {
        if (pdfData === null || currentPage === 1) {
          document.getElementById("go_previous").disabled = true;
        }
        if (pdfData === null || currentPage !== totalPages - 1) {
          document.getElementById("go_next").disabled = false;
        }
        document.getElementById("go_previous").classList.add("active");
        currentPage = currentPage - 1;

        document.getElementById("current_page").value = currentPage;

        renderPage(currentPage);
      });

      document.getElementById("go_next").addEventListener("click", (e) => {
        if (currentPage !== 1) {
          document.getElementById("go_previous").disabled = false;
        }
        if (pdfData === null || currentPage === totalPages - 1) {
          document.getElementById("go_next").disabled = true;
        }
        document.getElementById("go_next").classList.add("active");
        currentPage = currentPage + 1;
        document.getElementById("current_page").value = currentPage;

        renderPage(currentPage);

        if (currentPage === totalPages) {
          document.getElementById("current_page").value = currentPage;
          window.alert("done !!!");
        }
      });

     document.getElementById("current_page").addEventListener("keypress", (e)=>{
        if(pdfData === null) return;
        if(e.key === "Enter"){
            var desiredPage = document.getElementById("current_page").valueAsNumber

            if(desiredPage >= 1 && desiredPage <= totalPages){
                currentPage = desiredPage
                document.getElementById("current_page").value = desiredPage
                renderPage(currentPage)
            }
        }
     })

    });
  })
  .catch((error) => {
    console.log(error);
  });

//       window.addEventListener('scroll', () => {

//       const scrollY = window.scrollY;

//       const pageHeight = pdfContainer.clientHeight;
//       const scrollCalc = scrollY + 750;
//       console.log("scrollY is:- ",scrollY);
//       console.log("page3Height is:- ",pageHeight/ totalPages);
//       console.log("the curent page is", currentPage);
//    console.log("pdf hifht", pageHeight);
//  console.log("scrollCacl", scrollCalc);
//       if(scrollY >= pageHeight/totalPages && currentPage < totalPages ){
//           currentPage ++;

//           renderPage(currentPage)
//           //   if (currentPage === totalPages ) {
//           //     // User has read all pages, you can trigger an event or perform an action here.
//           //     console.log('User has read all pages.');
//           //   }
//           if(scrollCalc >= pageHeight){
//               window.alert("reached");
//            }
//           }
//         });
