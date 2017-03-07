/**
 * Created by omprakash on 4/24/2016.
 */
//Elements
var themeElements = {
    headerMenu: '.header-menu',
    slider: '.themex-slider',
    headerSlider: '.header-slider',
    carouselSlider: '.carousel-slider',
    selectField: '.select-field',
    selectMenu: '.mobile-menu',
    headerForm: '.header-form',
    headerLoginButton: '.header-login-button',
    headerLoginForm: '.header-login-form',
    headerPasswordButton: '.header-password-button',
    headerPasswordForm: '.header-password-form',
    facebookButton: '.facebook-login-button',
    colorboxLink: '.colorbox',
    colorboxValue: '.colorbox-value',
    placeholderFields: '.header-form input',
    tabsContainer: '.tabs-container',
    tabsTitles: '.tabs',
    tabsPane: '.pane',
    toggleTitle: '.toggle-title',
    toggleContent: '.toggle-content',
    toggleContainer: '.toggle-container',
    accordionContainer: '.accordion-container',
    uploadForm: '.upload-form',
    submitButton: '.submit-button',
    ajaxForm: '.ajax-form',
    elementSelect: '.element-select',
    elementOption: '.element-option',
    elementValue: '.element-value',
    popupContainer: '.popup-container',
    statusForm: '.status-form',
    chatContainer: '.chat-container',
    chatFormSend: '.chat-form-send',
    chatFormUpdate: '.chat-form-update',
    filterableList: '.filterable-list'
}

//DOM Loaded
jQuery(document).ready(function($) {

    //Dropdown Menu
    $(themeElements.headerMenu).find('li').hoverIntent(
        function() {
            var menuItem=$(this);
            menuItem.parent('ul').css('overflow','visible');
            menuItem.children('ul').slideToggle(200, function() {
                menuItem.addClass('hover');
            });
        },
        function() {
            var menuItem=$(this);
            menuItem.children('ul').slideToggle(200, function() {
                menuItem.removeClass('hover');
            });
        }
    );

    //Select Menu
    $(themeElements.selectMenu).find('select').fadeTo(0, 0);
    $(themeElements.selectMenu).find('span').text($(themeElements.selectMenu).find('option:eq(0)').text());
    $(themeElements.selectMenu).find('option').each(function() {
        if(window.location.href==$(this).val()) {
            $(themeElements.selectMenu).find('span').text($(this).text());
            $(this).attr('selected','selected');
        }
    });

    $(themeElements.selectMenu).find('select').change(function() {
        window.location.href=$(this).find('option:selected').val();
        $(themeElements.selectMenu).find('span').text($(this).find('option:selected').text());
    });

    $(themeElements.selectField).each(function() {
        $(this).find('select').fadeTo(0, 0);
        $(this).find('span').text($(this).find('option:eq(0)').text());
        if($(this).find('option:selected').length) {
            $(this).find('span').text($(this).find('option:selected').text());
        }

        $(this).change(function() {
            $(this).find('span').text($(this).find('option:selected').text());
        });
    });

    //Select Filter
    $(themeElements.filterableList).each(function() {
        var filter=$('.'+$(this).data('filter'));
        var label=$(this).parent().find('span');
        var list=$(this);

        if(filter.val()) {
            var items=list.find('option.'+filter.val());

            list.find('option').hide();
            if(items.length) {
                items.show();
                list.removeAttr('disabled');

                if(items.filter(':selected').length) {
                    label.text(items.filter(':selected').text());
                } else {
                    label.text(items.filter(':first').text());
                    items.removeAttr('selected');
                    items.filter(':first').attr('selected', 'selected');
                }
            } else {
                label.text(list.find('option:first-child').text());
                list.attr('disabled', 'disabled');
            }
        } else {
            label.text(list.find('option:first-child').text());
            list.attr('disabled', 'disabled');
        }

        filter.change(function() {
            var items=list.find('option.'+filter.val());

            list.find('option').hide();
            if(items.length) {
                items.show();
                list.removeAttr('disabled');
                label.text(items.filter(':first').text());
                items.removeAttr('selected');
                items.filter(':first').attr('selected', 'selected');
            } else {
                label.text(list.find('option:first').text());
                list.attr('disabled', 'disabled');
            }
        });
    });

    //Sliders
    $(themeElements.slider).each(function() {
        var sliderOptions= {};

        if($(this).is(themeElements.headerSlider)) {
            sliderOptions.effect='slide';
            sliderOptions.speed=$(this).find('.slider-speed').val();
            if($(this).find('.slider-pause').val()) {
                sliderOptions.pause=$(this).find('.slider-pause').val();
            }
        } else if($(this).is(themeElements.carouselSlider)) {
            sliderOptions.speed=0;
        }

        $(this).themexSlider(sliderOptions);
    });

    //Colorbox
    $(themeElements.colorboxLink).each(function() {
        var inline=false;
        if($(this).hasClass('inline')) {
            inline=true;
        }

        $(this).colorbox({
            rel: $(this).data('group'),
            inline: inline,
            current: '',
            maxWidth: '100%',
            maxHeight: '100%',
        });

        $(this).click(function() {
            if(inline) {
                $($(this).attr('href')).find('.message').html('');
                $($(this).attr('href')).find(themeElements.colorboxValue).val($(this).data('value'));
            }
        });
    });

    //Popup Form
    $(themeElements.headerLoginButton).add(themeElements.headerForm).click(function(e) {
        if(!$(this).hasClass('active')) {
            $(themeElements.headerLoginButton).add(themeElements.headerLoginForm).addClass('active');
        }

        return false;
    });

    $(themeElements.headerPasswordButton).click(function() {
        $(themeElements.headerLoginForm).addClass('switched');
        setTimeout(function() {
            $(themeElements.headerPasswordForm).addClass('active');
        }, 400);
    });

    $('body').click(function() {
        $(themeElements.headerLoginButton).add(themeElements.headerForm).removeClass('switched active');
    });

    //Popup Container
    $(themeElements.popupContainer).each(function() {
        var popup=$(this).parent().find('.popup');
        if(popup.length) {
            $(this).find('a').addClass('disabled').click(function() {
                $.colorbox({html:'<div class="popup">'+popup.html()+'</div>'});
                return false;
            });
        }
    });

    //Upload Form
    $(themeElements.uploadForm).find('input[type="file"]').change(function() {
        var form=$(this).parent();

        while(!form.is('form')) {
            form=form.parent();
        }

        form.submit();
    });

    //AJAX Form
    $(themeElements.ajaxForm).each(function() {
        var form=$(this);

        form.submit(function() {
            var message=form.find('.message'),
                loader=form.find('.loader'),
                toggle=form.find('.toggle'),
                button=form.find(themeElements.submitButton),
                title=form.find(themeElements.submitButton).data('title');

            var data={
                action: form.find('.action').val(),
                nonce: form.find('.nonce').val(),
                data: form.serialize()
            }

            loader.show();
            button.addClass('disabled').toggleClass('current');

            if(!message.hasClass('static')) {
                message.slideUp(300, function() {
                    $(themeElements.colorboxLink).colorbox.resize();
                });
            }

            jQuery.post(form.attr('action'), data, function(response) {
                if(jQuery('.redirect', response).length) {
                    if(jQuery('.redirect', response).attr('href')) {
                        window.location.href=jQuery('.redirect',response).attr('href');
                    } else {
                        window.location.reload();
                    }

                    message.remove();
                }

                if(title) {
                    button.data('title', button.attr('title'));
                    button.attr('title', title);
                }

                toggle.each(function() {
                    var value=toggle.val();
                    toggle.val(toggle.data('value'));
                    toggle.data('value', value);
                });

                loader.hide();
                button.removeClass('disabled');

                if(response!='' &&  response!='0' && response!='-1') {
                    if(message.hasClass('popup')) {
                        $.colorbox({html:'<div class="popup">'+response+'</div>'});
                    } else if(message.hasClass('static')) {
                        message.append(response);
                    } else {
                        message.html(response).slideDown(300, function() {
                            $(themeElements.colorboxLink).colorbox.resize();
                        });
                    }
                }

                form.find('.temporary').val('');
                form.find('.scroll').each(function() {
                    $(this).scrollTop($(this)[0].scrollHeight);
                });
            });

            return false;
        });
    });

    //Submit Button
    $(themeElements.submitButton).not('.disabled').click(function() {
        var form=$($(this).attr('href'));

        if(!form.length || !form.is('form')) {
            form=$(this).parent();
            while(!form.is('form')) {
                form=form.parent();
            }
        }

        form.submit();
        return false;
    });

    //Facebook Button
    $(themeElements.facebookButton).click(function() {
        if(typeof(FB)!='undefined') {
            FB.login(function(response) {
                if (response.authResponse) {
                    window.location.reload();
                }
            }, {
                scope: 'email'
            });
        }
    });

    //Placeholders
    $('input, textarea').each(function(){
        if($(this).attr('placeholder')) {
            $(this).placeholder();
        }
    });

    $(themeElements.placeholderFields).each(function(){
        if(!$(this).hasClass('static')) {
            var placeholder=$(this).val();

            $(this).focus(function () {
                if($(this).val()==placeholder){
                    $(this).val('');
                }
            });
            $(this).blur(function () {
                if(!$(this).val()){
                    $(this).val(placeholder);
                }
            });
        }
    });

    //Tabs
    if($(themeElements.tabsContainer).length) {
        $(themeElements.tabsContainer).each(function() {
            var tabs=$(this);
            tabs.find(themeElements.tabsTitles).find('li:first-child').addClass('current');

            tabs.find('.tabs li').click(function() {
                tabs.find('.tabs li').removeClass('current');
                $(this).addClass('current');

                tabs.find('.pane').hide();
                tabs.find('.pane:eq('+$(this).index()+')').show();
            });
        });
    }

    //Toggles
    $(themeElements.accordionContainer).each(function() {
        if(!$(this).find(themeElements.toggleContainer+'.expanded').length) {
            $(this).find(themeElements.toggleContainer).eq(0).addClass('expanded').find(themeElements.toggleContent).show();
        }
    });

    $(themeElements.toggleTitle).live('click', function() {
        if($(this).parent().parent().is(themeElements.accordionContainer) && $(this).parent().parent().find('.expanded').length) {
            if($(this).parent().hasClass('expanded')) {
                return false;
            }
            $(this).parent().parent().find('.expanded').find(themeElements.toggleContent).slideUp(200, function() {
                $(this).parent().removeClass('expanded');
            });
        }

        $(this).parent().find(themeElements.toggleContent).slideToggle(200, function(){
            $(this).parent().toggleClass('expanded');
        });

        $(this).find('input').prop('checked', true);
    });

    //Element Select
    $(themeElements.elementSelect).each(function() {
        var options=$(this).find(themeElements.elementOption),
            value=$(this).find(themeElements.elementValue);

        if(options.length) {
            options.eq(0).addClass('current');
            value.val(options.eq(0).data('value'));
        }

        options.click(function() {
            value.val($(this).data('value'));
            options.removeClass('current');
            $(this).addClass('current');
        });
    });

    //Update Status
    if($(themeElements.statusForm).length) {
        $(themeElements.statusForm).submit();
        setInterval(function() {
            $(themeElements.statusForm).submit();
        }, 120000);
    }

    //Update Chat
    $(themeElements.chatFormSend).each(function() {
        var form=$(this);
        var temporary=form.find('.temporary');
        var refresh=setInterval(function() {
            form.submit();
        }, 10000);

        form.submit();
        $(themeElements.chatFormUpdate).submit(function() {
            var message=$(this).find('.message');
            temporary.val(message.val());
            message.val('');
            form.submit();
            clearInterval(refresh);
            refresh=setInterval(function() {
                form.submit();
            }, 10000);

            return false;
        });
    });

    //DOM Elements
    $('p:empty').remove();
    $('h1,h2,h3,h4,h5,h6,blockquote').prev('br').remove();
});