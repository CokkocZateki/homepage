  $(function () {
      req = $.ajax({
          url: '/alliance.json',
          dataType: 'json'
      });
      req.success(function (data) {
          $('.js-members').text(data.alliance_members);
          $('.js-corps').text(data.alliance_corps);
          $('.counter').counterUp();
          var ctx = document.getElementById("graph").getContext("2d");
          var chart = new Chart(ctx).Line(data.history)
      });
  })
