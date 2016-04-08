/**
 * Created by iniyk on 16/3/31.
 */
$(document).ready(function() {
    $('#submit').click(onSubmit);
    $('#name').keypress(function (event) {
        if (event.which == 13 || event.which == 10) {
            event.preventDefault();
            onSubmit();
        }
    });
});

function onSubmit() {
    var name = $('#name').val();
    $.post('/', {name: name}, function(data, status) {
        if (data.err != undefined) {
            $('#main').html(`
                    <h2>${data.err}</h2>
                    <a href="/list">查看其它队伍</a>
                    <a href="/">返回</a>
                `);
        } else {
            var text = `${data.name}抽到了${data.problem}号题目!`;
            $('#main').html(`
                    <h2>${text}</h2>
                    <a href="/list">查看其它队伍</a>
                    <a href="/">返回</a>
                `);
        }
    });
}