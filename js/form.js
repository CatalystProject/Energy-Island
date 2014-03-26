$(function(){




$( "#windslider" ).slider({
        value: 2.5,
      min: 0,
      max: 5,
      step: 0.5,
      slide: function( event, ui ) {
        $( "#entry_788824438" ).val(  ui.value );
      }
    });
    $( "#entry_788824438" ).val( $( "#windslider" ).slider( "value" ) );



$( "#solarslider" ).slider({
value: 2.5,
      min: 0,
      max: 5,
      step: 0.5,
      slide: function( event, ui ) {
        $( "#entry_394802251" ).val(  ui.value );
      }
    });
    $( "#entry_394802251" ).val( $( "#solarslider" ).slider( "value" ) );


    //var formUrl = 'https://docs.google.com/forms/d/1z1Jaif-HgxOMKROmNPXbRSVfSS0B-QCJbhM1RWWPwwo/formResponse';//'https://docs.google.com/a/developmentseed.org/spreadsheet/formResponse?formkey=dGdwaW1VUW5uY0FSMjF0RVZBVldLTUE6MQ';
	var fileformurl = 'http://cs-vyv.lancs.ac.uk/catalyst/energyisland/';
    var formUrl = 'http://cs-vyv.lancs.ac.uk/catalyst/energyisland/upload_file.php';

/*
    // Set up map
    var m = mapbox.map('map').addLayer(mapbox.layer().id('willsimm.hahfo0cc'));
    m.centerzoom({ lat:56.5007, lon: -6.8805 }, 12);
    //m.addLayer(mapbox.layer().id('nigeriaoil.nigeria-lga'));

    // Set up map ui features with point selector
    var ui = mapbox.ui().map(m).auto().pointselector(function(d) {
        // Remove all points except the most recent
        for (var i = 0; i < d.length - 1; i++) {
            var locs = ui['_pointselector'].locations();
            ui['_pointselector'].deleteLocation(locs[i]);
        }
        saveLatLon(d[0]);
    });
    */
    
    /*
    m.on('click', function(e) {
	alert(e.latlng);
    });*/

    // Get LGA data and set up LGA typeahead
    //mapbox.converters.googledocs('0AoiGgH1LJtE0dGdwaW1VUW5uY0FSMjF0RVZBVldLTUE', 'od4', typeAhead);

    // Set up date pickers
    var now = new Date();
    now = now.getDate() + '/' + (now.getMonth()+1) + '/' +  now.getFullYear();
    
    

    $('#entry_284647925').val(now).datepicker({ endDate: now, format:'dd/mm/yyyy' });
    /*$('#entry_574205951').timepicker({
                minuteStep: 1,
                template: 'modal',
                appendWidgetTo: 'body',
                showSeconds: true,
                showMeridian: false,
                defaultTime: false
            });*/

    $('#entry_574205951').timepicker({});



//$('#entry_574205951').timepicker({minuteStep:1, template:'modal',appendWidgetTo:'body'});
    $('#fileform').submit(function(e) {
    	console.log('fileform submit');
    	data = $(this).serialize();
    	 e.preventDefault();
    	 $.ajax({
                type: 'POST',
                url: fileformurl,
                data: data,
                //dataType: "jsonp",
                complete: function(response) {
                    button.button('reset');
                    //top.window.location = 'heatmap/index.html#new';

                    console.log(response);
                }
   
                
            });
    	 
    });

    // Handle form submission
    $('#form1').submit(function(e) {
    	console.log('form submit');
    	
    	//upload from file, put url into entry_1129984154 blank out file
    	// $("#fileform").submit();
    	
    	
        var button = $('input[type=submit]', this),
            data = $(this).serialize();
            console.log(data);

        e.preventDefault();
        if (validate($(this))) {
            button.button('loading');
            
            
          //  var googleForm = $(window).jqGoogleForms({"formKey": "1z1Jaif-HgxOMKROmNPXbRSVfSS0B-QCJbhM1RWWPwwo"});

//googleForm.sendFormData(data);
            
            
            var formData = new FormData($(this)[0]);

 $.ajax({
        url: formUrl,
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
            alert(data)
        },
        cache: false,
        contentType: false,
        processData: false,
                        complete: function(data) {
                    button.button('reset');
                    top.window.location = 'heatmap/index.html#new';

                    console.log(data);
                }
    });

            /*$.ajax({
                type: 'POST',
                url: formUrl,
                data: data,
                //dataType: "jsonp",
                complete: function(data) {
                    button.button('reset');
                    //top.window.location = 'heatmap/index.html#new';

                    console.log(data);
                }
   
                
            });*/
            //button.button('reset');
        }
        

        function validate(form) {
            $('.control-group').removeClass('error');
            $('input, textarea', form).each(function() {
                var tag = $(this)[0].tagName.toLowerCase(),
                    type = $(this).attr('type');

                // Validate radio buttons
                if (tag === 'input' && type === 'radio') {
                    var name = $(this).attr('name');
                    if ($('[name="' + name + '"]:checked').length < 1) {
                        $(this).parent().parent().parent().addClass('error');
                    }
                }

                // Validate text fields
                if ((tag === 'input' && type === 'text') || tag === 'textarea') {
                    if ($(this).val() === '' && !$(this).parent().hasClass('radio')) {
                        $(this).parent().parent().addClass('error');
                    }
                }
                
                //validate detector name field
                var accepted = ["tesla", "elektra", "electra", "watt", "volta", "steve", "amber"];
                var dname = $(this).val().toLowerCase();
                var idee  = $(this).attr('id');
                
                if ((idee === 'entry_1036124373') && (jQuery.inArray(dname,accepted) === -1)) {
                  $(this).parent().parent().addClass('error');
                }
            });

            if ($('.control-group.error').length < 1) return true;
            $('.control-group.error').length
            
            $('html, body').animate({
                scrollTop: $('.control-group.error').offset().top - 20
            }, 500);

            return false;
        }
    });

    /*function typeAhead(features) {
        var lgas = [];

        // Pluck `LGA, state` values
        for (var i = 0; i < features.length; i++) {
            lgas.push(features[i].properties.lgastate);
        }

        $('#entry_0').typeahead({source: lgas}).change(function() {
            var position = $.inArray($(this).val(), lgas);
            if (position >= 0) {
                var coords = features[position].geometry.coordinates,
                    loc = { lon: coords[0], lat: coords[1] };

                saveLatLon(loc);
                m.center(loc).zoom(7);
                $('#map-control').show();
            }
        });
    }*/

    function saveLatLon(loc) {
        $('#entry_1672423225').val(loc.lon);
        $('#entry_855548269').val(loc.lat);
        target_lat=56.535727438167584;
        target_lon=-6.756131332397456;
        
        if ((loc.lat >= (target_lat-0.003) && loc.lat <= (target_lat+0.003)) && (loc.lon >= (target_lon-0.003) && loc.lon <= (target_lon+0.003))) {
            $('#entry_1672423225').val("in");
        }
        else { $('#entry_1672423225').val("out"); }

    }
});
