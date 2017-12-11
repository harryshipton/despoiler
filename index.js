(function() {
  function getUrlParameter(sParam) {
    let sPageURL = window.location.search.substring(1);
    let sURLVariables = sPageURL.split('&');
    let sParameterName;
    let i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (decodeURIComponent(sParameterName[0]) === sParam) {
        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
  }
  
  let characterString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let cArr = characterString.split('');
  let option = false;
  
  function sRot(input, roundUp) {
    let iArr = input.split('');
    let oArr = iArr.map(function(e) {
      let eI = cArr.indexOf(e);
      if(eI < 0) return e;
      return cArr[(eI + (roundUp ? Math.ceil(cArr.length/2) : Math.floor(cArr.length/2))) % cArr.length];
    });
    return oArr.join('');
  }
  
  function pRot(input, modifier) {
    let iArr = input.split('');
    let oArr = iArr.map(function(e, i) {
      let eI = cArr.indexOf(e);
      if(eI < 0) return e;
      return cArr[(eI + i*(modifier + cArr.length)) % cArr.length];
    });
    return oArr.join('');
  }
  
  function lRot(input, modifier) {
    let iArr = input.split('');
    let oArr = iArr.map(function(e) {
      let eI = cArr.indexOf(e);
      if(eI < 0) return e;
      return cArr[(eI + iArr.length*(modifier + cArr.length)) % cArr.length];
    });
    return oArr.join('');
  }
  
  function obfuscate(input) {
    input = sRot(input, false);
    input = pRot(input, 1);
    input = pRot(input, input.length % cArr.length);
    input = lRot(input, 1);
    $('#shareURL').val('https://spoil-it-for.me/?characterMap=' + encodeURIComponent(characterString) + "&reveal=" + encodeURIComponent(input));
    return input;
  }
  
  function reveal(input) {
    input = lRot(input, -1);
    input = pRot(input, (-1 * input.length) % cArr.length);
    input = pRot(input, -1);
    input = sRot(input, true);
    $('#shareURL').val('https://spoil-it-for.me/?characterMap=' + encodeURIComponent(characterString) + "&hide=" + encodeURIComponent(input));
    return input;
  }
  
  function modify(input) {
    $('#outTA').val(option ? reveal(input) : obfuscate(input));
  }
  
  $('#characterMix').bind('input propertychange', function(e) {
    characterString = $('#characterMix').val();
    cArr = characterString.split('');
    modify($('#inTA').val());
  });
  
  $('#optSel').change(function(e) {
    let selOpt = $('option:selected', this);
    option = selOpt[0].value === 'reveal';
    modify($('#inTA').val());
  });
  
  $('#inTA').bind('input propertychange', function(e) {
    modify($('#inTA').val());
  });
  
  $(document).ready(function() {
    let characterMix = getUrlParameter('characterMix');
    if(characterMix && characterMix !== true) {
      $('#characterMix').val(characterMix);
    }
    let reveal = getUrlParameter('reveal');
    let hide = getUrlParameter('hide');
    if(reveal && reveal !== true) {
      $('#optSel').val('reveal');
      $('#inTA').val(reveal);
    } else if(hide && hide !== true) {
      $('#optSel').val('hide');
      $('#inTA').val(hide);
    }
    
    let selOpt = $('option:selected', this);
    option = selOpt[0].value === 'reveal';
    
    characterString = $('#characterMix').val();
    cArr = characterString.split('');
    
    modify($('#inTA').val());
    
    $('select').material_select();
  });
})();
