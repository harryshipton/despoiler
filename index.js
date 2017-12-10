(function() {
  const characterString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const cArr = characterString.split('');
  let option = false;
  
  function sRot(input) {
    let iArr = input.split('');
    let oArr = iArr.map(function(e) {
      let eI = cArr.indexOf(e);
      if(eI < 0) return e;
      return cArr[(eI + cArr.length/2) % cArr.length];
    });
    return oArr.join('');
  }
  
  function pRot(input, modifier) {
    let iArr = input.split('');
    let oArr = iArr.map(function(e, i) {
      let eI = cArr.indexOf(e);
      if(eI < 0) return e;
      return cArr[(eI + i) % cArr.length];
    });
    return oArr.join('');
  }
  
  function obfuscate(input) {
    input = sRot(input);
    input = pRot(input, 1);
    return input;
  }
  
  function reveal(input) {
    input = sRot(input);
    input = pRot(input, -1);
    return input;
  }
  
  function modify(input) {
    $('#outTA').val(option ? reveal(input) : obfuscate(input));
  }
  
  $('#optSel').change('change', function(e) {
    let selOpt = $('option:selected', this);
    option = selOpt[0].value === 'reveal';
    console.log(option);
    modify($('#inTA').val());
  });
  
  $('#inTA').bind('input propertychange', function(e) {
    modify($('#inTA').val());
  });
})();
