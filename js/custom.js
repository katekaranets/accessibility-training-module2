var keys = {
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  delete: 46
};

$( document ).ready(function() {
  $(".skip").click(function(event){
      var skipTo="#"+this.href.split('#')[1];
      $(skipTo).attr('tabindex', -1).on('blur focusout', function () {
          $(this).removeAttr('tabindex');
      }).focus(); 
  });
});

(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll("#nav button").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav button");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
      navEl.removeAttribute('tabindex');
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
        navEl.setAttribute('tabindex', '-1');
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}





(function () {
  var tablist = document.querySelectorAll('[role="tablist"]')[0];
  var tabs;
  var panels;

  generateArrays();

  function generateArrays () {
    tabs = document.querySelectorAll('[role="tab"]');
    panels = document.querySelectorAll('[role="tabpanel"]');
  };

  var keys = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    delete: 46,
    enter: 13,
    space: 32
  };

  var direction = {
    37: -1,
    38: -1,
    39: 1,
    40: 1
  };

  for (i = 0; i < tabs.length; ++i) {
    addListeners(i);
  };

  function addListeners (index) {
    tabs[index].addEventListener('click', clickEventListener);
    tabs[index].addEventListener('keydown', keydownEventListener);
    tabs[index].addEventListener('keyup', keyupEventListener);
    tabs[index].index = index;
  };

  function clickEventListener (event) {
    var tab = event.target;
    activateTab(tab, false);
  };

  function keydownEventListener (event) {
    var key = event.keyCode;

    switch (key) {
      case keys.end:
        event.preventDefault();
        focusLastTab();
        break;
      case keys.home:
        event.preventDefault();
        focusFirstTab();
        break;
      case keys.up:
      case keys.down:
        determineOrientation(event);
        break;
    };
  };

  function keyupEventListener (event) {
    var key = event.keyCode;

    switch (key) {
      case keys.left:
      case keys.right:
        determineOrientation(event);
        break;
      case keys.delete:
        determineDeletable(event);
        break;
      case keys.enter:
      case keys.space:
        activateTab(event.target);
        break;
    };
  };

  function determineOrientation (event) {
    var key = event.keyCode;
    var vertical = tablist.getAttribute('aria-orientation') == 'vertical';
    var proceed = false;

    if (vertical) {
      if (key === keys.up || key === keys.down) {
        event.preventDefault();
        proceed = true;
      };
    }
    else {
      if (key === keys.left || key === keys.right) {
        proceed = true;
      };
    };

    if (proceed) {
      switchTabOnArrowPress(event);
    };
  };

  function switchTabOnArrowPress (event) {
    var pressed = event.keyCode;

    if (direction[pressed]) {
      var target = event.target;
      if (target.index !== undefined) {
        if (tabs[target.index + direction[pressed]]) {
          tabs[target.index + direction[pressed]].focus();
        }
        else if (pressed === keys.left || pressed === keys.up) {
          focusLastTab();
        }
        else if (pressed === keys.right || pressed == keys.down) {
          focusFirstTab();
        };
      };
    };
  };

  function activateTab (tab, setFocus) {
    setFocus = setFocus || true;
    deactivateTabs();
    tab.removeAttribute('tabindex'); 
    tab.setAttribute('aria-selected', 'true');
    var controls = tab.getAttribute('aria-controls');
    document.getElementById(controls).removeAttribute('hidden');
    if (setFocus) {
      tab.focus();
    };
  };

  function deactivateTabs () {
    for (t = 0; t < tabs.length; t++) {
      tabs[t].setAttribute('tabindex', '-1');
      tabs[t].setAttribute('aria-selected', 'false');
    };

    for (p = 0; p < panels.length; p++) {
      panels[p].setAttribute('hidden', 'hidden');
    };
  };

  function focusFirstTab () {
    tabs[0].focus();
  };

  function focusLastTab () {
    tabs[tabs.length - 1].focus();
  };

  function determineDeletable (event) {
    target = event.target;

    if (target.getAttribute('data-deletable') !== null) {
      deleteTab(event, target);
      generateArrays();
      if (target.index - 1 < 0) {
        activateTab(tabs[0]);
      }
      else {
        activateTab(tabs[target.index - 1]);
      };
    };
  };

  function deleteTab (event) {
    var target = event.target;
    var panel = document.getElementById(target.getAttribute('aria-controls'));

    target.parentElement.removeChild(target);
    panel.parentElement.removeChild(panel);
  };

  function determineDelay () {
    var hasDelay = tablist.hasAttribute('data-delay');
    var delay = 0;

    if (hasDelay) {
      var delayValue = tablist.getAttribute('data-delay');
      if (delayValue) {
        delay = delayValue;
      }
      else {
        delay = 300;
      };
    };

    return delay;
  };
}());

(function(){
  var isValid = false;
  var persons = [];
  var person = {};
  var usernameValid = false;
  var firstnameValid = false;
  var lastnameValid = false;
  var addressValid = false;
  var phoneValid = false;
  var emailValid = false;

  document.getElementById('submit').addEventListener('keyup', function(e){
    if(e.keyCode === 32 || e.keyCode === 13){
      document.getElementById('submit').click();
    }
  });

  document.getElementById('submit').addEventListener('click', function(e){
    e.preventDefault();
    validate();
    if(isValid) {
      person.username = document.getElementById('username-input').value;
      person.firstname = document.getElementById('firstname-input').value;
      person.lastname = document.getElementById('lastname-input').value;
      person.phonenumber = document.getElementById('phone-input').value;
      person.address = document.getElementById('address-input').value;
      person.zip = document.getElementById('zip-input').value;
      person.email = document.getElementById('email-input').value;
      persons.push(person);
      window.localStorage.setItem('users', JSON.stringify(persons));
      alert('Successfuly added');
      clearInputs();
    } else {
      var errors = document.querySelectorAll('.control input+p');
      for(var i=0; i<errors.length; i++){
        if(errors[i].innerHTML) {
          errors[i].previousElementSibling.focus();
          break;
        }
      }
    }
  });

  function validate() {
    validateUsername();
    validateFirstname();
    validateLastname();
    validateAddress();
    validatePhone();
    validateEmail();
    isValid = usernameValid && firstnameValid && lastnameValid && addressValid && phoneValid && emailValid;
  }

  document.getElementById('username-input').addEventListener('blur', validateUsername);
  document.getElementById('firstname-input').addEventListener('blur', validateFirstname);
  document.getElementById('lastname-input').addEventListener('blur', validateLastname);
  document.getElementById('address-input').addEventListener('blur', validateAddress);
  document.getElementById('phone-input').addEventListener('blur', validatePhone);
  document.getElementById('email-input').addEventListener('blur', validateEmail);

  function validateUsername() {
    var users = JSON.parse(window.localStorage.getItem('users'));
    var username = document.getElementById('username-input').value;
    if(username && !_.find(users, {username: username})){
      document.querySelector('#username-input+p').innerHTML = '';
      makeValidStyles('username');
      usernameValid = true;
      return true
    } 
    if (_.find(users, {username: username})){
      document.querySelector('#username-input+p').innerHTML = 'Such user exists. Choose another username.';
    }
    if(!username){
      document.querySelector('#username-input+p').innerHTML = 'Please provide username';
    }
    usernameValid = false;
    makeInvalidStyles('username');
    return false;
  }

  function validateFirstname() {
    var firstname = document.getElementById('firstname-input').value;
    if(firstname) {
      document.querySelector('#firstname-input+p').innerHTML = '';
      makeValidStyles('firstname');
      firstnameValid = true;
      return true;
    }
    firstnameValid = false;
    document.querySelector('#firstname-input+p').innerHTML = 'Please provide firstname.';
    makeInvalidStyles('firstname');
    return false;
  }

  function validateLastname() {
    var lastname = document.getElementById('lastname-input').value;
    if(lastname) {
      document.querySelector('#lastname-input+p').innerHTML = '';
      makeValidStyles('lastname');
      lastnameValid = true;
      return true;
    }
    lastnameValid = false;
    document.querySelector('#lastname-input+p').innerHTML = 'Please provide lastname.';
    makeInvalidStyles('lastname');
    return false;
  }

  function validateAddress() {
    var address = document.getElementById('address-input').value;
    if(address) {
      document.querySelector('#address-input+p').innerHTML = '';
      makeValidStyles('address');
      addressValid = true;
      return true;
    }
    addressValid = false;
    document.querySelector('#address-input+p').innerHTML = 'Please provide address.';
    makeInvalidStyles('address');
    return false;
  }

  function validatePhone(){
    var phone = document.getElementById('phone-input').value;
    if(phone && !isNaN(phone)){
      document.querySelector('#phone-input+p').innerHTML = '';
      makeValidStyles('phone');
      phoneValid = true;
      return true;
    }
    if (!phone){
      document.querySelector('#phone-input+p').innerHTML = 'Please provide phone number.';
    } else {
      document.querySelector('#phone-input+p').innerHTML = 'Phone number is incorrect.';
    }
    phoneValid = false;
    makeInvalidStyles('phone');
    return false;
  }

  function validateEmail() {
    var email = document.getElementById('email-input').value;
    if(email && checkEmail(email)){
      document.querySelector('#email-input+p').innerHTML = '';
      makeValidStyles('email');
      emailValid = true;
      return true
    }
    if (!email){
      document.querySelector('#email-input+p').innerHTML = 'Please provide email.';
    } else {
      document.querySelector('#email-input+p').innerHTML = 'Email is incorrect.';
    }
    emailValid = false;
    makeInvalidStyles('email');
    return false;
  }

  function makeValidStyles(field) {
    document.querySelector('#'+field+'-input').classList.remove('is-danger');
    document.querySelector('#'+field+'-input').classList.add('is-success');
  }

  function makeInvalidStyles(field) {
    document.querySelector('#'+field+'-input').classList.add('is-danger');
    document.querySelector('#'+field+'-input').classList.remove('is-success');
  }

  function clearInputs(){
    document.getElementById('username-input').value = null;
    document.getElementById('firstname-input').value = null;
    document.getElementById('lastname-input').value = null;
    document.getElementById('phone-input').value = null;
    document.getElementById('address-input').value = null;
    document.getElementById('zip-input').value = null;
    document.getElementById('email-input').value = null;

    document.querySelector('#username-input+p').innerHTML = '';
    document.querySelector('#firstname-input+p').innerHTML = '';
    document.querySelector('#lastname-input+p').innerHTML = '';
    document.querySelector('#phone-input+p').innerHTML = '';
    document.querySelector('#address-input+p').innerHTML = '';
    document.querySelector('#zip-input+p').innerHTML = '';
    document.querySelector('#email-input+p').innerHTML = '';
  }

  function checkEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

})()


