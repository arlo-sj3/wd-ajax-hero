(function() {
    'use strict';

    const movies = [];

    const renderMovies = function() {
        $('#listings').empty();

        for (const movie of movies) {
            const $col = $('<div>').addClass('col s6');
            const $card = $('<div>').addClass('card hoverable');
            const $content = $('<div>').addClass('card-content center');
            const $title = $('<h6>').addClass('card-title truncate');

            $title.attr({
                'data-position': 'top',
                'data-tooltip': movie.title
            });

            $title.tooltip({
                delay: 50
            }).text(movie.title);

            const $poster = $('<img>').addClass('poster');

            $poster.attr({
                src: movie.poster,
                alt: `${movie.poster} Poster`
            });

            $content.append($title, $poster);
            $card.append($content);

            const $action = $('<div>').addClass('card-action center');
            const $plot = $('<a>');

            $plot.addClass('waves-effect waves-light btn modal-trigger');
            $plot.attr('href', `#${movie.id}`);
            $plot.text('Plot Synopsis');

            $action.append($plot);
            $card.append($action);

            const $modal = $('<div>').addClass('modal').attr('id', movie.id);
            const $modalContent = $('<div>').addClass('modal-content');
            const $modalHeader = $('<h4>').text(movie.title);
            const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
            const $modalText = $('<p>').text(movie.plot);

            $modalContent.append($modalHeader, $movieYear, $modalText);
            $modal.append($modalContent);

            $col.append($card, $modal);

            $('#listings').append($col);

            $('.modal-trigger').leanModal();
        }
    };

    $('button').click(function() {
        event.preventDefault();


    });

    $('button').click(function() {

        // $('#listings').empty();
        while (movies.length > 0) {
            movies.pop()
            console.log(movies)
        };
        console.log($('#listings'))
        var search = $('#search').val()
        console.log(search)
        if (search === '') {
            alert('BAD touch')
        } else {
            $.getJSON('http://omdbapi.com/?s=' + search).done(function(data) {
                for (var i = 0; i < data.Search.length; i++) {

                    let movie = {}
                    movie.id = data.Search[i].imdbID;
                    movie.poster = data.Search[i].Poster;
                    movie.title = data.Search[i].Title;
                    movie.type = data.Search[i].Type;
                    movie.year = data.Search[i].Year;

                    $.getJSON('http://omdbapi.com/?i=' + movie.id).done(function(doota) {
                        movie.plot = doota.Plot
                        movies.push(movie)
                        renderMovies();
                    });
                    console.log(data)
                    // console.log(data.search.Year)
                    // movies.push(movie);

                }
                // renderMovies();
            });

        }
    });

    // ADD YOUR CODE HERE
})();
