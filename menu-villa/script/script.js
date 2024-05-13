// Function to fetch and display movie details in modal
function showMovieDetails(imdbID) {
  $.ajax({
    url: 'http://omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      'apikey': 'd3d74353',
      'i': imdbID, // Pass IMDb ID to get specific movie details
      'plot': 'full' // Get full plot of the movie
    },
    success: function (result) {
      let movieDetails = `
        <h5>${result.Title} (${result.Year})</h5>
        <p>${result.Plot}</p>
        <p><strong>Director:</strong> ${result.Director}</p>
        <p><strong>Actors:</strong> ${result.Actors}</p>
        <p><strong>Genre:</strong> ${result.Genre}</p>
        <p><strong>Runtime:</strong> ${result.Runtime}</p>
      `;
      $("#modal-body").html(movieDetails);
      $('#movieModal').modal('show'); // Show the modal
    }
  });
}

$('#cari-btn').on('click', function () {
  $.ajax({
    url: 'http://omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      'apikey': 'd3d74353',
      's': $('#search-input').val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;
        $("#berita-list .row").empty(); // Clear previous results
        $.each(movies, function (i, data) {
          $("#berita-list .row").append(`
            <div class="col-md-4 mt-3">
              <div class="card" style="height: 100%;">
                <img src="${data.Poster}" class="card-img-top" style="height: 400px; object-fit: cover;">
                <div class="card-body">
                  <h5 class="card-title">${data.Title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Year: ${data.Year}</h6>
                </div>
                <div class="card-footer">
                  <a class="card-link" onclick="showMovieDetails('${data.imdbID}')">Details</a>
                </div>
              </div>
            </div>
          `);
        });
      } else {
        $("#berita-list").html(`
          <div class="col">
            <h1 class="text-center">Film Tidak Ditemukan</h1>
          </div>
        `);
      }
    },
  });
});
