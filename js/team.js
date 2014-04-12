$(document).ready(function(){
	var team = [
        {
            name: "Chintan Parikh",
            image: "img/people/chintan.jpg",
            title: "Director",
            email: "chintan@gtsx.org"
        },
    ];


    var team_template = $('#team-template').html();

    for(var member in team){
        console.log(team[member]);
        $('#team-wrapper').append(
            Mustache.render(team_template, team[member])
        );

    }
  
    $(".team-member").hover(
        function () {
            $(".team-member-details", this).stop(true,true).fadeIn();
        },
        function () {
            $(".team-member-details", this).stop(true,true).fadeOut();
        }
    );
});