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
    })
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
    })
})
