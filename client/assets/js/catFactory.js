//Random color
function getColor() {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
}

function genColors() {
  var colors = [];
  for (var i = 10; i < 99; i++) {
    var color = getColor();
    colors[i] = color;
  }
  return colors;
}

//This function code needs to modified so that it works with Your cat code.
function headColor(color, code) {
  $('.cat__head, .cat__chest').css('background', '#' + color); //This changes the color of the cat
  $('#headcode').html('code: ' + code); //This updates text of the badge next to the slider
  $('#dnabody').html(code); //This updates the body color part of the DNA that is displayed below the cat
}

function mouthColor(color, code) {
  $(
    '.cat__mouth-contour, .cat__mouth-left, .cat__mouth-right, .cat__chest_inner, .cat__tail'
  ).css('background', '#' + color);
  $('#mouthcode').html('code: ' + code);
  $('#dnamouth').html(code);
}

function eyesColor(color, code) {
  $('.pupil-left, .pupil-right').css('background', '#' + color);
  $('#eyescode').html('code: ' + code);
  $('#dnaeyes').html(code);
}

function earsColor(color, code) {
  $(
    '.cat__ear--left, .cat__ear--right, .cat__paw-left, .cat__paw-left_inner, .cat__paw-right_inner, .cat__paw-right'
  ).css('background', '#' + color);
  $('#earscode').html('code: ' + code);
  $('#dnaears').html(code);
}

function decorationMidcolor(color, code) {
  $('.cat__head-dots').css('background', '#' + color);
  $('#decorationMid').html('code: ' + code);
  $('#dnadecorationMid').html(code);
}

function decorationSidescolor(color, code) {
  $('.cat__head-dots_first, .cat__head-dots_second').css(
    'background',
    '#' + color
  );
  $('#decorationSides').html('code: ' + code);
  $('#dnadecorationSides').html(code);
}

//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {
  $('#dnashape').html(num);
  switch (num) {
    case 1:
      normalEyes();
      $('#eyeName').html('Basic');
      break;
    case 2:
      normalEyes(); // reset
      $('#eyeName').html('Chill'); // Set the badge to "Chill"
      eyesType1(); // Set border to change the shape of the eye
      break;
    case 3:
      normalEyes();
      $('#eyeName').html('Happy');
      eyesType2();
      break;
  }
}

function decorationVariation(num) {
  $('#dnadecoration').html(num);
  switch (num) {
    case 1:
      $('#decorationName').html('Basic');
      normaldecoration();
      break;
    case 2:
      normaldecoration();
      $('#decorationName').html('Diagonal');
      hairType1();
      break;
    case 3:
      normaldecoration();
      $('#decorationName').html('Fork');
      hairType2();
      break;
    case 4:
      normaldecoration();
      $('#decorationName').html('Arrow');
      hairType3();
      break;
    case 5:
      normaldecoration();
      $('#decorationName').html('Plus');
      hairType4();
      break;
    case 6:
      normaldecoration();
      $('#decorationName').html('Single');
      hairType5();
      break;
    case 7:
      normaldecoration();
      $('#decorationName').html('Bald');
      hairType6();
      break;
  }
}

function animationVariation(num) {
  $('#dnaanimation').html(num);
  switch (num) {
    case 1:
      $('#animationName').html('Head');
      animationType1();
      break;
    case 2:
      $('#animationName').html('Tail');
      animationType2();
      break;
    case 3:
      $('#animationName').html('Ear');
      animationType3();
      break;
    case 4:
      $('#animationName').html('Attention');
      animationType4();
      break;
  }
}

function animationType1() {
  resetAnimation();
  $('#head').addClass('movingHead');
  $('#leftEar').addClass('movingEarsLeft');
  $('#rightEar').addClass('movingEarsRight');
}

function animationType2() {
  resetAnimation();
  $('#tail').addClass('movingTail');
}

function animationType3() {
  resetAnimation();
  $('#leftEar').addClass('movingSingleEarLeft');
}

function animationType4() {
  resetAnimation();
  $('#leftEar').addClass('attentionLeft');
  $('#rightEar').addClass('attentionRight');
}

function resetAnimation() {
  $('#head').removeClass('movingHead');
  $('#tail').removeClass('movingTail');
  $('#leftEar').removeClass('movingSingleEarLeft');
  $('#leftEar').removeClass('movingEarsLeft');
  $('#rightEar').removeClass('movingEarsRight');
  $('#leftEar').removeClass('attentionLeft');
  $('#rightEar').removeClass('attentionRight');
}

async function normalEyes() {
  await $('.cat__eye').find('span').css('border', 'none');
}

async function eyesType1() {
  await $('.cat__eye').find('span').css('border-top', '15px solid');
}

async function eyesType2() {
  await $('.cat__eye').find('span').css('border-bottom', '15px solid');
}

async function normaldecoration() {
  //Remove all style from other decorations
  //In this way we can also use normalDecoration() to reset the decoration style
  $('.cat__head-dots').css({
    transform: 'rotate(0deg)',
    height: '48px',
    width: '14px',
    top: '1px',
    'border-radius': '0 0 50% 50%',
    visibility: 'visible',
  });
  $('.cat__head-dots_first').css({
    transform: 'rotate(0deg)',
    height: '35px',
    width: '14px',
    top: '1px',
    'border-radius': '50% 0 50% 50%',
    visibility: 'visible',
  });
  $('.cat__head-dots_second').css({
    transform: 'rotate(0deg)',
    height: '35px',
    width: '14px',
    top: '1px',
    'border-radius': '0 50% 50% 50%',
    visibility: 'visible',
  });
}

async function hairType1() {
  $('.cat__head-dots').css({
    transform: 'rotate(57deg)',
    height: '48px',
    width: '14px',
    top: '1px',
    'border-radius': '0 0 50% 50%',
  });
  $('.cat__head-dots_first').css({
    transform: 'rotate(0deg)',
    height: '35px',
    width: '14px',
    top: '1px',
    'border-radius': '50% 0 50% 50%',
  });
  $('.cat__head-dots_second').css({
    transform: 'rotate(0deg)',
    height: '35px',
    width: '14px',
    top: '1px',
    'border-radius': '0 50% 50% 50%',
  });
}

async function hairType2() {
  $('.cat__head-dots').css({
    transform: 'rotate(0deg)',
    height: '48px',
    width: '14px',
    top: '1px',
    'border-radius': '0 0 50% 50%',
  });
  $('.cat__head-dots_first').css({
    transform: 'rotate(35deg)',
    height: '35px',
    width: '14px',
    top: '1px',
    'border-radius': '50% 0 50% 50%',
  });
  $('.cat__head-dots_second').css({
    transform: 'rotate(327deg)',
    height: '35px',
    width: '14px',
    top: '1px',
    'border-radius': '0 50% 50% 50%',
  });
}

async function hairType3() {
  $('.cat__head-dots').css({
    transform: 'rotate(0deg)',
    height: '48px',
    width: '14px',
    top: '1px',
    'border-radius': '0 0 50% 50%',
  });
  $('.cat__head-dots_first').css({
    transform: 'rotate(307deg)',
    height: '35px',
    width: '14px',
    top: '1px',
    'border-radius': '50% 0 50% 50%',
  });
  $('.cat__head-dots_second').css({
    transform: 'rotate(49deg)',
    height: '35px',
    width: '14px',
    top: '1px',
    'border-radius': '0 50% 50% 50%',
  });
}

async function hairType4() {
  $('.cat__head-dots').css({
    transform: 'rotate(0deg)',
    height: '48px',
    width: '14px',
    top: '1px',
    'border-radius': '0 0 50% 50%',
  });
  $('.cat__head-dots_first').css({
    transform: 'rotate(90deg)',
    height: '35px',
    width: '14px',
    top: '1px',
    'border-radius': '50% 0 50% 50%',
  });
  $('.cat__head-dots_second').css({
    transform: 'rotate(270deg)',
    height: '35px',
    width: '14px',
    top: '1px',
    'border-radius': '0 50% 50% 50%',
  });
}

async function hairType5() {
  $('.cat__head-dots').css({
    transform: 'rotate(0deg)',
    height: '48px',
    width: '14px',
    top: '1px',
    'border-radius': '0 0 50% 50%',
  });
  $('.cat__head-dots_first').css({
    visibility: 'hidden',
  });
  $('.cat__head-dots_second').css({
    visibility: 'hidden',
  });
}

async function hairType6() {
  $('.cat__head-dots').css({
    visibility: 'hidden',
  });
  $('.cat__head-dots_first').css({
    visibility: 'hidden',
  });
  $('.cat__head-dots_second').css({
    visibility: 'hidden',
  });
}
