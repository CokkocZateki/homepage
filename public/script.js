  $(function () {
      req = $.ajax({
          url: '/alliance.json',
          dataType: 'json'
      });
      req.success(function (data) {
          $('.js-members').text(data.alliance_members);
          $('.js-corps').text(data.alliance_corps);
          $('.counter').counterUp();
      });
  })
