$('#getghusername').on('click', function(e) {
    e.preventDefault();
    var username = $('#ghusername').val();
    var source = $('#newtemplate').html();    // this is the id of the <template>
    var template = Handlebars.compile(source);
 
    var ghprofuri = 'https://api.github.com/users/' + username + '?client_id=105a140f1cf546a14c96&client_secret=0720e817925e73b3f387ba2dcbe979b429a88309'
    var ghrepouri = 'https://api.github.com/users/' + username + '/repos?client_id=105a140f1cf546a14c96&client_secret=0720e817925e73b3f387ba2dcbe979b429a88309'
 
    getData();
 
    $('#ghusername').val('')
 
 
      function getData(){
        $.ajax({
          url: ghprofuri,
          type: 'GET',
          data_type: 'json',
          success: function(githubProfile){
                  $('#profile').append(template(githubProfile));
                },
          error: function() { alert("Profile not found!"); }
        });
 
        var commits;
 
        $.getJSON(ghrepouri, function(json){
           repositories = json;
           var temp = getCommits();
        });
 
        var commitsNumber=0;
        var commitsHTML;
 
        function getCommits() {
          if(repositories.length === 0) {
              commitsHTML = '<p>No commits!</p>';
              $('#' + username + 'commits').html(commitsHTML);
            }
            else
            {
              $.each(repositories, function (index){
                $.getJSON('https://api.github.com/repos/' + username + '/' +repositories[index].name + '/contributors?client_id=105a140f1cf546a14c96&client_secret=0720e817925e73b3f387ba2dcbe979b429a88309',
 
                function (commits){
                    $.each(commits, function (index){
                      if(commits[index].login === username) {
                      commitsNumber += commits[index].contributions;
                      }
                    });
                      commitsHTML = '<p>'+commitsNumber+' commits!</p>';
                      $('#'+username+'commits').html(commitsHTML);
                  });
              })
 
            }
        }
      }
    }); 