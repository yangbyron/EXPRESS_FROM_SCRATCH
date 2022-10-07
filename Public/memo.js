$.get('http://localhost:8000/api/memo',(descriptions)=>{
    let $displayDiv = $('<div class="display"></div>');
    for (let i=0;i<descriptions.length;i++){
            let $description = $(`<p class="description">${descriptions[i].description}</p><button id="${descriptions[i].memo_id}" class="delete">Delete</button>`);
            $displayDiv.append($description);
    }
    $('body').prepend($displayDiv);

    $buttons = $('.delete');
    $buttons.on('click',(e)=>{
        $.ajax({
            url: 'http://localhost:8000/api/memo',
            type: 'DELETE',
            data: {"id":e.target.id},
            success: function(){
                console.log(e.target.id);
                location.reload();
            }
        })
    })
});