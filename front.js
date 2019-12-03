function export_table_to_csv() {

    // Generate our CSV string from out HTML Table
    var csv = tableToCSV( document.querySelector( "#table-csv" ) );
    // Create a CSV Blob
    var blob = new Blob( [ csv ], { type: "text/csv"} );

    // Determine which approach to take for the download
    if ( navigator.msSaveOrOpenBlob ) {
      // Works for Internet Explorer and Microsoft Edge
      navigator.msSaveOrOpenBlob( blob, "output.csv" );

    } else {

      // Attempt to use an alternative method
      var anchor = document.body.appendChild(
        document.createElement( "a" )
      );
      // If the [download] attribute is supported, try to use it
      if ( "download" in anchor ) {
        anchor.download = "output.csv";
        anchor.href = URL.createObjectURL( blob );
        anchor.click();
      }

    }

    function tableToCSV( table ) {
      // We'll be co-opting `slice` to create arrays
      var slice = Array.prototype.slice;

      return slice.call( table.rows ).map(function ( row ) {
        return slice.call( row.cells ).map(function ( cell ) {
          return '"t"'.replace( "t", cell.textContent );
        }).join( "," );
      }).join( "\r\n" );

    }

  };

document.querySelector("#get-csv").addEventListener("click", function () {
    export_table_to_csv();
});