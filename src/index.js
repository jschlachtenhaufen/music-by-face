import $ from 'jquery';
import './style.scss';

$('#main').html('Here we go!');

let time = 1;
setInterval(() => {
    $('#main').html(`You've been here for ${time} seconds`);
    time += 1;
}, 1000);
