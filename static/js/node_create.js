$(function () {
  $('select.fm-text').chosen({width: '45%', no_results_text: '无此节点'});

  $('.edui-for-myinsertimage').live('click', function() {
    $('#pic-select').click();
    return false;
  });
  $('#pic-select').fileupload({
    url: '/image/upload?_xsrf=' + get_cookie('_xsrf'),
    type: 'POST',
    dataType: 'json',
    sequentialUploads: true,
    autoUpload: true,
    progressall: function(e, data){
      var progress = parseInt(data.loaded / data.total * 100, 10);
      var $status_msg = $('.status-msg');
      $status_msg.addClass('loader-bar').html('图片上传进度：' + progress + '%');
      if( progress == 100 ){
        $status_msg.removeClass('loader-bar').html('图片上传完毕');
      }
    },
    done: function(e, result){
      var $status_msg = $('.status-msg');
      data = result.result;
      if(data.status == "success"){
        ue.focus(true);
        ue.execCommand('inserthtml', '<img class="upload-node-image" src="' + data.path + '" style="max-width:480px;">');
      } else {
        $status_msg.removeClass('loader-bar').html('图片上传失败');
        noty(data);
      }
    }
  });
  $('button.set-node-img').live('click', function() {
    var category = $(this).attr('data-category');
    $select = $('#node-img-select');
    $select.attr('data-category', category);
    $('input#category').val(category);
    $select.click();
    return false;
  });

  $('#node-img-select').fileupload({
    type: 'POST',
    dataType: 'json',
    sequentialUploads: true,
    autoUpload: true,
    progressall: function(e, data){
      var progress = parseInt(data.loaded / data.total * 100, 10);
      var category = $(this).attr('data-category');
      if (category === 'icon') {
        var $status_msg = $('.ico-preview').next('.status-msg');
      } else if (category == 'head') {
        var $status_msg = $('.head-preview').next('.status-msg');
      } else if (category == 'background') {
        var $status_msg = $('.background-preview').next('.status-msg');
      }
      $status_msg.addClass('loader-bar').html('图片上传进度：' + progress + '%');
      if( progress == 100 ){
        $status_msg.removeClass('loader-bar').html('图片上传完毕');
      }
    },
    done: function(e, result){
      var category = $(this).attr('data-category');
      if (category === 'icon') {
        var $status_msg = $('.ico-preview').next('.status-msg');
      } else if (category == 'head') {
        var $status_msg = $('.head-preview').next('.status-msg');
      } else if (category == 'background') {
        var $status_msg = $('.background-preview').next('.status-msg');
      }
      data = result.result;
      if(data.status == "success"){
        if (category === 'icon') {
          $('.ico-preview img').attr('src', data.path);
        } else if (category === 'head') {
          $('.head-preview img').attr('src', data.path);
          $('#head').css({'background': 'url(' + data.path + ')', 'background-size': '100%'});
        } else if (category === 'background') {
          $('.background-preview img').attr('src', data.path);
        }
        noty(data);
      } else {
        $status_msg.removeClass('loader-bar').html('图片上传失败');
        noty(data);
      }
    }
  });
});
