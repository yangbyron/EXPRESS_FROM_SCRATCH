$.get('https://expressapi-81b8.onrender.com/api/memo',(descriptions)=>{
    console.log(descriptions);
    let $displayDiv = $('<div class="display"></div>');
    for (let i=0;i<descriptions.length;i++){
            let $description = $(`<p class="description">${descriptions[i].description}</p><button id="${descriptions[i].id}" class="delete">Delete</button>`);
            $displayDiv.append($description);
    }
    $('body').prepend($displayDiv);

    $buttons = $('.delete');
    $buttons.on('click',(e)=>{
        $.ajax({
            type: 'DELETE',
            url: 'https://expressapi-81b8.onrender.com/api/memo',
            data: {"id":e.target.id},
            success: function(){
                console.log(e.target.id);
                location.reload();
            }
        })
    })
});