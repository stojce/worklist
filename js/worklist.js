//  vim:ts=4:et
//
//  Copyright (c) 2010, LoveMachine Inc.  
//  All Rights Reserved.  
//  http://www.lovemachineinc.com

var activeUsersFlag=1;
var bidNotesHelper="This is where you describe to the Runner your approach on how to get this job done. These notes are one tool the Runners use to compare bidders and decide who is right for the job.";

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
    } 
}

function RelativeTime(x){
    var plural = '';
 
    var mins = 60, hour = mins * 60; day = hour * 24,
        week = day * 7, month = day * 30, year = day * 365;

    if (x >= year) { x = (x / year)|0; dformat="yr"; }
    else if (x >= month) { x = (x / month)|0; dformat="mnth"; }
    else if (x >= day*4) { x = (x / day)|0; dformat="day"; }
    else if (x >= hour) { x = (x / hour)|0; dformat="hr"; }
    else if (x >= mins) { x = (x / mins)|0; dformat="min"; }
    else { x |= 0; dformat="sec"; }
    if (x > 1) plural = 's';
    if (x < 0) x = 0;
    return x + ' ' + dformat + plural;
}

function formatTime(x){
    var month = Array(12);
    month[0] = '01';
    month[1] = '02';
    month[2] = '03';
    month[3] = '04';
    month[4] = '05';
    month[5] = '06';
    month[6] = '07';
    month[7] = '08';
    month[8] = '09';
    month[9] = '10';
    month[10] = '11';
    month[11] = '12';
    
    today = new Date();
    today = today.setTime(x);
    return month[today.getMonth()] + '/' + today.getDate() + '/' + today.getFullYear();
}

/*
 *   Function: AjaxPopup
 *
 *    Purpose: This function is used for popups that require additional information from
 *             the server and uses an Ajax post call to query the server.
 *
 * Parameters: popupId - The id element for the block holding the popup's html
 *             titleString - The title for the popup box
 *             urlString - The URL to issue the Ajax call to 
 *             keyId - The database id that will be mapped to 'itemid' in the form
 *             fieldArray - An array containing the list of fields that need
 *                          to be updated on the popup box.
 *                array[0] - Type of element being populated [input|textbox|checkbox|span]
 *                array[1] - Type if of the element being populated
 *                array[2] - The value to be inserted into the element 
 *                array[3] - undefined or 'eval' - If eval the array[2] item will
 *                           be passed to eval() for working with json return objects
 *             successFunc - An optional function that gets executed after populating the fields.
 *
 */
function AjaxPopup(popupId,
           titleString,
           urlString,
           keyId,
           fieldArray,
           successFunc)
{
  $(popupId).data('title.dialog', titleString);

  $.ajax({type: "POST",
      url: urlString,
      data: 'item='+keyId,
      dataType: 'json',
      success: function(json) {

        $.each(fieldArray, 
           function(key,value){
             if(value[0] == 'input') {
               if(value[3] != undefined && value[3] == 'eval')  {
             $('.popup-body form input[name="' + value[1] +'"]').val( eval(value[2]) );
               } else {
             $('.popup-body form input[name="' + value[1] +'"]').val( value[2] );
               }
             }
             
             if(value[0] == 'textarea') {
               if(value[3] != undefined && value[3] == 'eval')  {
             $('.popup-body form textarea[name="' + value[1] +'"]').val( eval(value[2]) );
               } else {
             $('.popup-body form textarea[name="' + value[1] +'"]').val( value[2] );
               }
             }
             
             if(value[0] == 'checkbox') {
               if(value[3] != undefined && value[3] == 'eval')  {
             $('.popup-body form checkbox[name="' + value[1] +'"] option[value="'+ eval(value[2])+'"]').prop('checked', true);         
               } else {
             $('.popup-body form checkbox[name="' + value[1] +'"] option[value="'+ value[2] +'"]').prop('checked', true);         
               }
             }
             
             if(value[0] == 'span')  {
               if(value[3] != undefined && value[3] == 'eval')  {
             $('.popup-body form ' + value[1]).text( eval(value[2]) );
               } else {
             $('.popup-body form ' + value[1]).text( value[2] );
               }
             }
           });

        if(successFunc !== undefined) {
          successFunc(json);
        }
            }
    });

  
}

/*
 *   Function: SimplePopup
 *
 *    Purpose: This function is used for popups that do not require additional 
 *             calls to the server to grab data.
 *
 * Parameters: popupId - The id element for the block holding the popup's html
 *             titleString - The title for the popup box
 *             keyId - The database id that will be mapped to 'itemid' in the form
 *             fieldArray - An array containing the list of fields that need
 *                          to be updated on the popup box.
 *                array[0] - Type of element being populated [input|textbox|checkbox|span]
 *                array[1] - Type if of the element being populated
 *                array[2] - The value to be inserted into the element 
 *                array[3] - undefined or 'eval' - If eval the array[2] item will
 *                           be passed to eval() for working with json return objects
 *             successFunc - An optional function that gets executed after populating the fields.
 *
 */
function SimplePopup(popupId,
             titleString,
             keyId,
             fieldArray,
             successFunc)
{
  $(popupId).data('title.dialog', titleString);

  $.each(fieldArray, 
     function(key,value){
       if(value[0] == 'input') {
         if(value[3] != undefined && value[3] == 'eval')  {
           $('.popup-body form input[name="' + value[1] +'"]').val( eval(value[2]) );
         } else {
           $('.popup-body form input[name="' + value[1] +'"]').val( value[2] );
         }
       }
       
       if(value[0] == 'textarea') {
         if(value[3] != undefined && value[3] == 'eval')  {
           $('.popup-body form textarea[name="' + value[1] +'"]').val( eval(value[2]) );
         } else {
           $('.popup-body form textarea[name="' + value[1] +'"]').val( value[2] );
         }
       }
       
       if(value[0] == 'checkbox') {
         if(value[3] != undefined && value[3] == 'eval')  {
           $('.popup-body form checkbox[name="' + value[1] +'"] option[value="'+ eval(value[2])+'"]').prop('checked', true);         
         } else {
           $('.popup-body form checkbox[name="' + value[1] +'"] option[value="'+ value[2] +'"]').prop('checked', true);         
         }
       }
       
       if(value[0] == 'span')  {
         if(value[3] != undefined && value[3] == 'eval')  {
           $('.popup-body form ' + value[1]).text( eval(value[2]) );
         } else {
           $('.popup-body form ' + value[1]).text( value[2] );
         }
       }
       
     });

  if(successFunc !== undefined) {
    successFunc(json);
  }
}

/* When applied to a textfield or textarea provides default text which is displayed, and once clicked on it goes away
 Example:  $("#name").DefaultValue("Your fullname.");
*/
jQuery.fn.DefaultValue = function(text){
    return this.each(function(){
    //Make sure we're dealing with text-based form fields
    if(this.type != 'text' && this.type != 'password' && this.type != 'textarea')
      return;
    
    //Store field reference
    var fld_current=this;
    
    //Set value initially if none are specified
        if(this.value=='' || this.value == text) {
      this.value=text;
    } else {
      //Other value exists - ignore
      return;
    }
    
    //Remove values on focus
    $(this).focus(function() {
      if(this.value==text || this.value=='')
        this.value='';
    });
    
    //Place values back on blur
    $(this).blur(function() {
      if(this.value==text || this.value=='')
        this.value=text;
    });
    
    //Capture parent form submission
    //Remove field values that are still default
    $(this).parents("form").each(function() {
      //Bind parent form submit
      $(this).submit(function() {
        if(fld_current.value==text) {
          fld_current.value='';
        }
      });
    });
    });
};

    var getPosFromHash = function(){
        var pos, hashString;
        var vars = [], hash;
        pos = location.href.indexOf("#");
        if (pos != -1) {
            hashString = location.href.substr(pos + 1);
            var hashes = hashString.split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = unescape(hash[1]);
            }            
        }
        return vars;
    };

$(function() {
    $('#share-this').hide();
    $("#notes").DefaultValue(bidNotesHelper);
    $('#notes').css('color','#999999');
    $('#notes').css('font-style','italic');    
    $("#query").DefaultValue("Search...");
    $("#feesDialog").dialog({
        title: "Earnings",
        autoOpen: false,
        height: 'auto',
        width: '200px',
        position: ['center',60],
        modal: true
    });
    //debugger;
    $("#welcome .earnings").click(function(){
        $("#feesDialog").dialog("open");
    });
    if ($("#budgetPopup").length > 0) {
        $("#welcome .budget").html(' <a href="javascript:;" class="budget">Budget</a> ');
        $("#budgetPopup").dialog({
            title: "Budget",
            autoOpen: false,
            height: 'auto',
            width: '250px',
            position: ['center',60],
            modal: true
        });
        $("#welcome .budget").click(function(){
            $("#budgetPopup").dialog("open");
        });
    }

    //Enable/disable job bug id on is_bug checkbox state
    $("#bug_job_id").ready(function() {
        if ( !$("#is_bug").is ( ":checked" ) ) {
            $("#bug_job_id").prop ( "disabled" , true );
        } else {
            $("#bug_job_id").removeAttr ( "disabled" );
        }
        //bind paste event to lookup for bug job summary 
        jQuery(document).bind('paste', function(e){
            $("#bug_job_id").keyup();
        });
    });

    //Checkbox is_bug click event
    $("#is_bug").click(function(){
        if ( !$(this).is ( ":checked" ) ) {
            //Disable and clean bug_job_id
            $("#bug_job_id").prop ( "disabled" , true );
            $("#bug_job_id").val ("");
            $('#bugJobSummary').html('');
            $("#bugJobSummary").attr("title" , 0);
        } else {
            //Enable bug_job_id textbox
            $("#bug_job_id").removeAttr ( "disabled" );
        }
    });

    $("#bug_job_id").blur(function() {
        $("#bug_job_id").keyup();
    });


    //lookup and show job summary on bug_job_id change
    $("#bug_job_id").keyup(function() {

        var id=$("#bug_job_id").val();
        if(id.length) {
            $.ajax({
                url: 'getjobinformation.php',
                dataType: 'json',
                data: {
                    itemid:id
                },
                type: 'POST',
                success: function(json) {
                    if ( !json || json === null ) {
                        alert("json null in getjobinformation");
                        return;
                    }
                    if ( json.error ) {
                        alert(json.error);
                    } else {
                        if(json.returnString.length>0) {
                            $('#bugJobSummary').html('<p><small>'+json.returnString+'</small></p>');
                            $("#bugJobSummary").attr("title" , id);    
                        } else {
                            $('#bugJobSummary').html("<p><small>Item doesn't exist</small></p>");
                            $("#bugJobSummary").attr("title" , 0);
                        }
                    }
                }
            });
        }
    });

    newHash = getPosFromHash();
    if (newHash['userid'] && newHash['userid'] != -1) {
        setTimeout(function(){
            showUserInfo(newHash['userid']);
        },2000);
    }
    
    $('#budget-expanded').dialog({ autoOpen: false, width:920, show:'fade', hide:'drop' });
});

/* get analytics info for this page */
$(function() {
    $.analytics = $('#analytics');
    if($.analytics) {
        var jobid=$.analytics.attr('data');
        $.ajax({
            url: 'visitQuery.php?jobid='+jobid,
            dataType: 'json',
            success: function(json) {
                if(parseInt(json.visits)+parseInt(json.views) == 0)
                {
                    $.analytics.hide();
                    return;
                }
                var p = $('<p>').html('Page views');
                p.append($('<span>').html(' Unique: ' + json.visits))
                p.append($('<span>').html(' Total: ' + json.views));
                $.analytics.append(p);
            },
        });
    }
});

$(function() {
    // bind on beforeshow newList
    $('select[name=user]').bind({
        'beforeshow newlist': function(e, o) {
            
            // check if the div for the active only button has already been created
            // create it if it hasn't
            if($('#userActiveBox').length == 0) {
                var div = $('<div/>').attr('id', 'userActiveBox');                    
                // now we add a function which gets called on click
                div.click(function(e) {
                    e.stopPropagation();
                    // we hide the list and remove the active state
                    activeUsersFlag = 1 - activeUsersFlag;
                    o.list.hide();
                    $('#userActiveBox').prop('checked', (activeUsersFlag ? true : false));
                    $('#userActiveBox').hide();
                    o.container.removeClass('ui-state-active');
                    // we send an ajax request to get the updated list
                    $.ajax({
                        type: 'POST',
                        url: 'refresh-filter.php',
                        data: {
                            name: filterName,
                            active: activeUsersFlag,
                            filter: 'users'
                        },
                        dataType: 'json',
                        // on success we update the list
                        success: $.proxy(o.setupNewList, o)
                    });
                });                    
                $('.userCombo').append(div);
            }
            
            // set up the label and checkbox to be placed in the div
            var label = $('<label/>').css('color', '#ffffff').attr('for', 'onlyActive');
            var checkbox = $('<input/>').attr({
                type: 'checkbox',
                id: 'onlyActive'
            }).css({
                margin: 0,
                position: 'relative',
                top: '1px'
            });

            // update the checkbox
            if (activeUsersFlag) {
                checkbox.prop('checked', true);
            } else {
                checkbox.prop('checked', false);
            }
            
            // put the label + checkbox into the div
            label.text(' Active only');
            label.prepend(checkbox);
            $('#userActiveBox').html(label);
        }
    }).comboBox();
    $('#search-filter-wrap select[name=status]').comboBox();
});
    
// function to bind hide and show events for the active only divs 
// bind to the showing and hiding of project and user lists
$(function() {
    $('select[name=user]').bind({
        'listOpen': function(e,o) {
            $('#userActiveBox').width($('.userComboList').outerWidth());
            $('#userActiveBox').css({
                top: $('.userComboList').height() + 35,
                left: $('.userComboList').css('left')
            });
            $('#userActiveBox').show();
        } 
    });
    $('select[name=user]').bind({
        'listClose': function(e,o) {
            $('#userActiveBox').hide();
        }
    });
    $('select[name=project]').bind({
        'listOpen': function(e,o) {
            $('#projectActiveBox').width($('.projectComboList').outerWidth());
            $('#projectActiveBox').css({
                top: $('.projectComboList').height() + 35,
                left: $('.projectComboList').css('left')
            });
            $('#projectActiveBox').show();
        } 
    });
    $('select[name=project]').bind({
        'listClose': function(e,o) {
            $('#projectActiveBox').hide();
        }
    });
    $('select[name=itemProject]').bind({
        'listOpen': function(e,o) {
            $('#projectPopupActiveBox').width($('.itemProjectComboList').outerWidth());
            $('#projectPopupActiveBox').css({
                top: $('.itemProjectComboList').height() + 100,
                left: $('.itemProjectComboList').css('left')
            });
            $('#projectPopupActiveBox').show();
        } 
    });
    $('select[name=itemProject]').bind({
        'listClose': function(e,o) {
            $('#projectPopupActiveBox').hide();
        }
    });   
});

function sendInviteForm(){
  var name = $('input[name="invite"]').val();
  var job_id = $('input[name="worklist_id"]').val();
  $.ajax({
    type: "POST",
    url: "workitem.php?job_id="+job_id,
    data: "json=y&invite="+name+"&invite-people=Invite",
    dataType: "json",
    success: function(json) {
        if(json['sent'] =='yes'){
            $("#sent-notify").html("<span>invite sent to <strong>"+name+"</strong></span>");
            $('input[name="invite"]').val('');
        }else{
            $("#sent-notify").html("<span>The user you entered does not exist</span>");
        }
        $("#sent-notify").dialog("open");
    },
    error: function(xhdr, status, err) {
      $("#sent-notify").html("<span>Error sending invitation</span>");
    }
  });
  return false;
}
function applyPopupBehavior() {
    $(function() {
        $('#addaccordion').fileUpload({tracker: $('input[name=files]')});
    });
    
    $('a.attachment').live('click', function() {
        var dialogUrl = $(this).attr('href');
        var verified = false;
        if (dialogUrl == 'javascript:;') {
            $.ajax({
                type: 'post',
                url: 'jsonserver.php',
                data: {
                    fileid: $(this).data('fileid'),
                    action: 'getVerificationStatus'
                },
                dataType: 'json',
                success: function(data) {
                    if (data.success && data.data.status == 1) {
                        dialogUrl = data.data.url;
                        verified = true;
                    } else if(data.success && data.data.status == 0) {
                        alert('This file is awaiting verification, please try again after sometime.');
                    } else {
                        alert('Error while trying to fetch file.');
                    }
                }
        
                
            });   
            if (verified == false) {
                return false;
            }
        }

        
        $('<img src="'+dialogUrl+'" title="Preview">').dialog({
                modal: true,
                hide: 'drop', 
                resizable: false,
                width: 'auto',
                height: 'auto',                
                open:function(evt){
                    $(this).parent().css('opacity','0');
                    storeCursorStatus = new Array();
                    $('*').each(function(){
                        if($(this).css('cursor')!='auto')
                            storeCursorStatus.push([$(this), $(this).css('cursor')]); });
                    $('*:visible').css('cursor','wait');
                    window.imageFiredDialogRedim = [false, evt.target];  
                    
                    $(evt.target).load(function(){
                            var image = $(this);
                            // get image size
                            var origWidt = parseInt(image.naturalWidth);  
                            var origHeig = parseInt(image.naturalHeight);
                            if(!origWidt||!origHeig){
                                var origWidt = parseInt(image.width());
                                var origHeig = parseInt(image.height()); 
                            }
                            var padding = 20;
                            var imageMargin = 12;
                            ratio = Math.min(($(window).width()-(imageMargin+padding)*2) / origWidt,
                                            ($(window).height()-(imageMargin+padding)*2) / origHeig);
                            var zoom='';
                            //alert(($(window).width()-padding*2)+' , ' +($(window).height()-padding*2)+' ==  '+origWidt+','+origHeig+ ' === '+ratio);
                            //alert('width'+(origWidt*ratio)+', height'+(origHeig*ratio));
                            if(ratio<1){
                                image.css({'width':origWidt*ratio,'height':origHeig*ratio});
                            }
                            var dialog = image.parent()
                            var top = ($(window).height() - image.height())/2 - imageMargin + $(window).scrollTop();
                            var left = ($(window).width() - image.width())/2 - imageMargin;
                            dialog.css({
                                'top': top,
                                'left': left 
                            });
                            $('*').css('cursor','auto');
                            $.each(storeCursorStatus,function(i,v){
                                v[0].css('cursor',v[1]); });
                            if(ratio<1){
                                zoom='('+Math.round(ratio*100)+'%)';
                                image.prev('div').append(
                                '<span class="dialogZoom" style="margin-left:10px;">'+zoom+'</span>');
                            }
                            if (ratio!='Infinity'){
                                image.css({'margin':imageMargin+'px','padding':'0','border':'1px solid #ccc'});
                                if($.browser.msie){
                                    image.css({'border':'2px solid #000'});
                                }else if($.browser.mozilla){
                                    image.css({'-moz-box-shadow':'rgba(169, 169, 169, 0.5) 3px 3px 3px'});
                                }else{
                                    image.css({'-webkit-box-shadow':'rgba(169, 169, 169, 0.5) 3px 3px 3px'});
                                }
                                image.parent().hide();
                                image.parent().css('opacity','1').fadeIn();
                                clearInterval(window.imageFiredDialogRedim[3]);
                            }
                    })
                    window.imageFiredDialogRedim[3] =
                        setInterval(function(){
                            if(!window.imageFiredDialogRedim[0]){
                                $(window.imageFiredDialogRedim[1]).trigger('load');
                            }
                        },1500);
                },
                resizeStart:function(){
                    $(this).parent().find('.dialogZoom').html(''); },               // hide srink percentage on resize
                dragStop:function(evt){
                    var dialog = $(evt.target);                                     // check if not out of screen

                } 
            }); 
        return false;
    });
    
    $('a.docs').live('click', function() {
        //alert($(this).data('fileid'));
        $.ajax({
            type: 'post',
            url: 'jsonserver.php',
            data: {
                fileid: $(this).data('fileid'),
                action: 'getVerificationStatus'
            },
            dataType: 'json',
            success: function(data) {
                //alert(data.data.status + data.data.url);
                if (data.success && data.data.status == 1) {
                    window.open(data.data.url);
                } else {
                    alert('This file is awaiting verification, please try again after sometime.');
                }
            }
        });
        return false;
    });
}

function makeWorkitemTooltip(className){

    $(className).tooltip({
        delay: 0,
        extraClass: "content",
        showURL: false,
        bodyHandler: function() {
        var msg = "Test";
        var worklist_id = $(this).attr('id').substr(9);
        $.ajax({
            type: "POST",
            async: false,
            url: 'getworkitem.php',
            data: {'item' : worklist_id},
            dataType: 'json',
            bgcolor:"#ffffff",
            success: function(json) {
                msg = json.summary ? '<div class = "head">' + json.summary + '</div>' : '';
                msg += json.notes ? '<div class = "tip-entry no-border">' + json.notes + '</div>' : '';
                msg += json.project ? '<div class = "tip-entry">Project: ' + json.project + '</div>' : '';
                if (json.runner) {
                    msg += '<div class = "tip-entry">Runner: ' + json.runner + '</div>';
                } else if (json.creator) {
                    msg += '<div class = "tip-entry">Creator: ' + json.creator + '</div>';
                }
                msg += json.job_status ? '<div class = "tip-entry">Status: ' + json.job_status + '</div>' : '';
                if (json.comment) {
                    msg += '<div class = "tip-entry">Last Comment by ' + json.commentAuthor + ': ' + json.comment + '</div>';
                } else {
                    msg += '<div class = "tip-entry">No comments yet.</div>';
                }
                if (msg == '') {
                    msg = 'No data available';
                }
            },
            error: function(xhdr, status, err) {
                msg = 'Data loading error.<br />Please try again.';
            }
        });

        return $('<div>').html(msg);
    }
    });
}

// function to add an inline message above the job listing
// call with the html you want in the inline message
function addInlineMessage(html) {
    $('#inlineMessage').append(html);
    $('#inlineMessage').show();
}


$(function() {
    runDisableable();
});

function runDisableable() {
    $(".disableable").click(function() {
        $(this).click(function() {
            $(this).attr('disabled', 'disabled');
        });
        return true;
    });
}

/**
 * Show a dialog with expanded info on the selected @section
 * Sections:
 *  - 0: Allocated
 *  - 1: Submited
 *  - 2: Paid
 */
function budgetExpand(section) {
    $('#be-search-field').val('');
    $('#be-search-field').keyup(function() {
        // Search current text in the table by hiding rows
        var search = $(this).val().toLowerCase();
        
        $('.data_row').each(function() {
            var html = $(this).text().toLowerCase();
            // If the Row doesn't contain the pattern hide it
            if (!html.match(search)) {
                $(this).fadeOut('fast');
            } else { // If is hidden but matches the pattern, show it
                if (!$(this).is(':visible')) {
                    $(this).fadeIn('fast');
                }
            }
        });
    });
    // If clean search, fade in any hidden items
    $('#be-search-clean').click(function() {
        $('#be-search-field').val('');
        $('.data_row').each(function() {
            $(this).fadeIn('fast');
        });
    });
    switch (section) {
        case 0:
            // Fetch new data via ajax
            $('#budget-expanded').dialog('open');
            be_getData(section);
            break;
        case 1:
            // Fetch new data via ajax
            $('#budget-expanded').dialog('open');
            be_getData(section);
            break;
        case 2:
            // Fetch new data via ajax
            $('#budget-expanded').dialog('open');
            be_getData(section);
            break;
    }
}

function be_attachEvents(section) {
    $('#be-id').click(function() {
        be_handleSorting(section, $(this));
    });
    $('#be-summary').click(function() {
        be_handleSorting(section, $(this));
    });
    $('#be-who').click(function() {
        be_handleSorting(section, $(this));
    });
    $('#be-amount').click(function() {
        be_handleSorting(section, $(this));
    });
    $('#be-status').click(function() {
        be_handleSorting(section, $(this));
    });
    $('#be-created').click(function() {
        be_handleSorting(section, $(this));
    });
    $('#be-paid').click(function() {
        be_handleSorting(section, $(this));
    });
}

function be_getData(section, item, desc) {
    // Clear old data
    var header = $('#table-budget-expanded').children()[0];
    $('#table-budget-expanded').children().remove();
    $('#table-budget-expanded').append(header);
    be_attachEvents(section);
    
    var params = '?section='+section;
    var sortby = '';
    // If we've got an item sort by it
    if (item) {
        sortby = item.attr('id');
        params += '&sortby='+sortby+'&desc='+desc;
    }
    
    $.getJSON('get-budget-expanded.php'+params, function(data) {
        // Fill the table
        for (var i = 0; i < data.length; i++) {
            var link = '<a href="workitem.php?job_id='+data[i].id+'&action=view" target="_blank">';
            // Separate "who" names into an array so we can add the userinfo for each one
            var who = data[i].who.split(", ");
            var who_link = '';
            for (var z = 0; z < who.length; z++) {
                if (z < who.length-1) {
                    who[z] = '<a href="#" onclick="showUserInfo('+data[i].ids[z]+')">'+who[z]+'</a>, ';
                } else {
                    who[z] = '<a href="#" onclick="showUserInfo('+data[i].ids[z]+')">'+who[z]+'</a>';
                }
                who_link += who[z];
            }
            
            var row = '<tr class="data_row"><td>'+link+'#'+data[i].id+'</a></td><td>'+link+data[i].summary+'</a></td><td>'+who_link+
                      '</td><td>$'+data[i].amount+'</td><td>'+data[i].status+'</td>'+
                      '<td>'+data[i].created+'</td>';
            if (data[i].paid != 'Not Paid') {
                row += '<td>'+data[i].paid+'</td></tr>';
            } else {
                row += '<td>'+data[i].paid+'</td></tr>';
            }
            $('#table-budget-expanded').append(row);
        }
    });
    $('#budget-report-export').click(function() {
        window.open('get-budget-expanded.php?section='+section+'&action=export', '_blank');
    });
}

function be_handleSorting(section, item) {
    var desc = true;
    if (item.hasClass('desc')) {
        desc = false;
    }
    
    // Cleanup sorting
    be_cleaupTableSorting();
    item.removeClass('asc');
    item.removeClass('desc');
    
    // Add arrow
    var arrow_up = '<div style="float:right;">'+
                   '<img src="images/arrow-up.png" height="15" width="15" alt="arrow"/>'+
                   '</div>';

    var arrow_down = '<div style="float:right;">'+
                     '<img src="images/arrow-down.png" height="15" width="15" alt="arrow"/>'+
                     '</div>';

    if (desc) {
        item.append(arrow_down);
        item.addClass('desc');
    } else {
        item.append(arrow_up);
        item.addClass('asc');
    }

    // Update Data
    be_getData(section, item, desc);
}

function be_cleaupTableSorting() {
    $('#be-id').children().remove();
    $('#be-summary').children().remove();
    $('#be-who').children().remove();
    $('#be-amount').children().remove();
    $('#be-status').children().remove();
    $('#be-created').children().remove();
    $('#be-paid').children().remove();
}
