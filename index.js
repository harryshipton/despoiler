(function() {
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
    return input;
  }
  
  function reveal(input) {
    input = lRot(input, -1);
    input = pRot(input, (-1 * input.length) % cArr.length);
    input = pRot(input, -1);
    input = sRot(input, true);
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
    $('select').material_select();
  });
})();
