$(function(){
    // saving an article
    $('.save-article').on('click', function(e){
        e.preventDefault();
        let query = '/api/save/' + $(this).data('id');
        $.ajax({
            method: "GET",
            url: query
        })
        .done(function(data) {
            // Refresh the Window after the call is done
            console.log(data);
        });
    });
    // removing an article
    $('.remove-article').on('click', function(e){
        e.preventDefault();
        let query = '/api/unsave/' + $(this).data('id');
        console.log(query);
        $.ajax({
            method: "GET",
            url: query
        })
        .done(function(data) {
            // Refresh the Window after the call is done
            //console.log(data);
            location.reload();
        });
    });
    // addding new notes article
    $('.add-article-note').on('click', function(e){
        e.preventDefault();
        let query = '/api/notes/' + $(this).data('id');
        let noteData = {
            user: $("#user-name").val().trim(),
            body: $("#note-body").val().trim()
        }
        $.ajax({
            method: "POST",
            url: query,
            data: noteData
        })
        .done(function(data) {
            // Refresh the Window after the call is done
            //console.log(data);
            location.reload();
        });
    });

});
