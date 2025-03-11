/* IDs of XML Instance Representation boxes */
var xiBoxes = new Array('element_database_xibox', 'element_header_xibox', 'element_created_xibox', 'element_researcher_xibox', 'element_mediapath_xibox', 'element_name-formats_xibox', 'element_format_xibox', 'element_tags_xibox', 'element_tag_xibox', 'element_events_xibox', 'element_event_xibox', 'element_people_xibox', 'element_person_xibox', 'element_families_xibox', 'element_family_xibox', 'element_citations_xibox', 'element_citation_xibox', 'element_sources_xibox', 'element_source_xibox', 'element_places_xibox', 'element_placeobj_xibox', 'element_objects_xibox', 'element_object_xibox', 'element_repositories_xibox', 'element_repository_xibox', 'element_notes_xibox', 'element_note_xibox', 'element_bookmarks_xibox', 'element_bookmark_xibox', 'element_namemaps_xibox', 'element_map_xibox', 'group_researcher-content_xibox', 'element_resname_xibox', 'element_resaddr_xibox', 'element_reslocality_xibox', 'element_rescity_xibox', 'element_resstate_xibox', 'element_rescountry_xibox', 'element_respostal_xibox', 'element_resphone_xibox', 'element_resemail_xibox', 'attributeGroup_table-object_xibox', 'attributeGroup_primary-object_xibox', 'type_person-content_xibox', 'element_gender_xibox', 'element_name_xibox', 'element_eventref_xibox', 'element_lds_ord_xibox', 'element_objref_xibox', 'element_address_xibox', 'element_attribute_xibox', 'element_url_xibox', 'element_childof_xibox', 'element_parentin_xibox', 'element_personref_xibox', 'element_noteref_xibox', 'element_citationref_xibox', 'element_tagref_xibox', 'type_name-content_xibox', 'element_first_xibox', 'element_call_xibox', 'element_surname_xibox', 'element_suffix_xibox', 'element_title_xibox', 'element_nick_xibox', 'element_familynick_xibox', 'element_group_xibox', 'attributeGroup_surname-content_xibox', 'type_address-content_xibox', 'element_street_xibox', 'element_locality_xibox', 'element_city_xibox', 'element_county_xibox', 'element_state_xibox', 'element_country_xibox', 'element_postal_xibox', 'element_phone_xibox', 'element_date-content_xibox', 'element_daterange_xibox', 'element_datespan_xibox', 'element_dateval_xibox', 'element_datestr_xibox', 'type_family-content_xibox', 'element_rel_xibox', 'element_father_xibox', 'element_mother_xibox', 'element_childref_xibox', 'type_event-content_xibox', 'element_type_xibox', 'element_place_xibox', 'element_description_xibox', 'type_citation-content_xibox', 'element_page_xibox', 'element_confidence_xibox', 'element_srcattribute_xibox', 'element_sourceref_xibox', 'type_source-content_xibox', 'element_stitle_xibox', 'element_sauthor_xibox', 'element_spubinfo_xibox', 'element_sabbrev_xibox', 'element_reporef_xibox', 'type_place-content_xibox', 'element_ptitle_xibox', 'element_code_xibox', 'element_pname_xibox', 'element_coord_xibox', 'element_placeref_xibox', 'element_location_xibox', 'type_object-content_xibox', 'element_file_xibox', 'type_repository-content_xibox', 'element_rname_xibox', 'attributeGroup_bookmark-content_xibox', 'attributeGroup_map-content_xibox', 'attributeGroup_format-content_xibox', 'type_note-content_xibox', 'group_styledtext_xibox', 'element_text_xibox', 'element_style_xibox', 'element_range_xibox', 'attributeGroup_citationref-content_xibox', 'type_personref-content_xibox', 'attributeGroup_sourceref-content_xibox', 'type_eventref-content_xibox', 'type_reporef-content_xibox', 'attributeGroup_noteref-content_xibox', 'type_priv-content_xibox', 'type_attribute-content_xibox', 'attributeGroup_srcattribute-content_xibox', 'attributeGroup_url-content_xibox', 'type_objref-content_xibox', 'element_region_xibox', 'type_lds-content_xibox', 'element_temple_xibox', 'element_status_xibox', 'element_sealed_to_xibox', 'attributeGroup_region-content_xibox', 'type_placename-content_xibox', 'type_placeref-content_xibox', 'attributeGroup_tagref-content_xibox', 'attributeGroup_tag-content_xibox');
/* IDs of Schema Component Representation boxes */
var scBoxes = new Array('schema_scbox', 'element_database_scbox', 'element_header_scbox', 'element_created_scbox', 'element_researcher_scbox', 'element_mediapath_scbox', 'element_name-formats_scbox', 'element_format_scbox', 'element_tags_scbox', 'element_tag_scbox', 'element_events_scbox', 'element_event_scbox', 'element_people_scbox', 'element_person_scbox', 'element_families_scbox', 'element_family_scbox', 'element_citations_scbox', 'element_citation_scbox', 'element_sources_scbox', 'element_source_scbox', 'element_places_scbox', 'element_placeobj_scbox', 'element_objects_scbox', 'element_object_scbox', 'element_repositories_scbox', 'element_repository_scbox', 'element_notes_scbox', 'element_note_scbox', 'element_bookmarks_scbox', 'element_bookmark_scbox', 'element_namemaps_scbox', 'element_map_scbox', 'group_researcher-content_scbox', 'element_resname_scbox', 'element_resaddr_scbox', 'element_reslocality_scbox', 'element_rescity_scbox', 'element_resstate_scbox', 'element_rescountry_scbox', 'element_respostal_scbox', 'element_resphone_scbox', 'element_resemail_scbox', 'attributeGroup_table-object_scbox', 'attributeGroup_primary-object_scbox', 'type_person-content_scbox', 'element_gender_scbox', 'element_name_scbox', 'element_eventref_scbox', 'element_lds_ord_scbox', 'element_objref_scbox', 'element_address_scbox', 'element_attribute_scbox', 'element_url_scbox', 'element_childof_scbox', 'element_parentin_scbox', 'element_personref_scbox', 'element_noteref_scbox', 'element_citationref_scbox', 'element_tagref_scbox', 'type_name-content_scbox', 'element_first_scbox', 'element_call_scbox', 'element_surname_scbox', 'element_suffix_scbox', 'element_title_scbox', 'element_nick_scbox', 'element_familynick_scbox', 'element_group_scbox', 'attributeGroup_surname-content_scbox', 'type_address-content_scbox', 'element_street_scbox', 'element_locality_scbox', 'element_city_scbox', 'element_county_scbox', 'element_state_scbox', 'element_country_scbox', 'element_postal_scbox', 'element_phone_scbox', 'element_date-content_scbox', 'element_daterange_scbox', 'element_datespan_scbox', 'element_dateval_scbox', 'element_datestr_scbox', 'type_family-content_scbox', 'element_rel_scbox', 'element_father_scbox', 'element_mother_scbox', 'element_childref_scbox', 'type_event-content_scbox', 'element_type_scbox', 'element_place_scbox', 'element_description_scbox', 'type_citation-content_scbox', 'element_page_scbox', 'element_confidence_scbox', 'element_srcattribute_scbox', 'element_sourceref_scbox', 'type_source-content_scbox', 'element_stitle_scbox', 'element_sauthor_scbox', 'element_spubinfo_scbox', 'element_sabbrev_scbox', 'element_reporef_scbox', 'type_place-content_scbox', 'element_ptitle_scbox', 'element_code_scbox', 'element_pname_scbox', 'element_coord_scbox', 'element_placeref_scbox', 'element_location_scbox', 'type_object-content_scbox', 'element_file_scbox', 'type_repository-content_scbox', 'element_rname_scbox', 'attributeGroup_bookmark-content_scbox', 'attributeGroup_map-content_scbox', 'attributeGroup_format-content_scbox', 'type_note-content_scbox', 'group_styledtext_scbox', 'element_text_scbox', 'element_style_scbox', 'element_range_scbox', 'attributeGroup_citationref-content_scbox', 'type_personref-content_scbox', 'attributeGroup_sourceref-content_scbox', 'type_eventref-content_scbox', 'type_reporef-content_scbox', 'attributeGroup_noteref-content_scbox', 'type_priv-content_scbox', 'type_attribute-content_scbox', 'attributeGroup_srcattribute-content_scbox', 'attributeGroup_url-content_scbox', 'type_objref-content_scbox', 'element_region_scbox', 'type_lds-content_scbox', 'element_temple_scbox', 'element_status_scbox', 'element_sealed_to_scbox', 'attributeGroup_region-content_scbox', 'type_placename-content_scbox', 'type_placeref-content_scbox', 'attributeGroup_tagref-content_scbox', 'attributeGroup_tag-content_scbox');

/**
 * Can get the ID of the button controlling
 * a collapseable box by concatenating
 * this string onto the ID of the box itself.
 */
var B_SFIX = "_button";

/**
 * Counter of documentation windows
 * Used to give each window a unique name
 */
var windowCount = 0;

/**
 * Returns an element in the current HTML document.
 * 
 * @param elementID Identifier of HTML element
 * @return               HTML element object
 */
function getElementObject(elementID) {
    var elemObj = null;
    if (document.getElementById) {
        elemObj = document.getElementById(elementID);
    }
    return elemObj;
}             

/**
 * Closes a collapseable box.
 * 
 * @param boxObj       Collapseable box
 * @param buttonObj Button controlling box
 */
function closeBox(boxObj, buttonObj) {
  if (boxObj == null || buttonObj == null) {
     // Box or button not found
  } else {
     // Change 'display' CSS property of box
     boxObj.style.display="none";

     // Change text of button 
     if (boxObj.style.display=="none") {
        buttonObj.value=" + ";
     }
  }
}

/**
 * Opens a collapseable box.
 * 
 * @param boxObj       Collapseable box
 * @param buttonObj Button controlling box
 */
function openBox(boxObj, buttonObj) {
  if (boxObj == null || buttonObj == null) {
     // Box or button not found
  } else {
     // Change 'display' CSS property of box
     boxObj.style.display="block";

     // Change text of button
     if (boxObj.style.display=="block") {
        buttonObj.value=" - ";
     }
  }
}

/**
 * Sets the state of a collapseable box.
 * 
 * @param boxID Identifier of box
 * @param open If true, box is "opened",
 *             Otherwise, box is "closed".
 */
function setState(boxID, open) {
  var boxObj = getElementObject(boxID);
  var buttonObj = getElementObject(boxID+B_SFIX);
  if (boxObj == null || buttonObj == null) {
     // Box or button not found
  } else if (open) {
     openBox(boxObj, buttonObj);
     // Make button visible
     buttonObj.style.display="inline";
  } else {
     closeBox(boxObj, buttonObj);
     // Make button visible
     buttonObj.style.display="inline";
  }
}

/**
 * Switches the state of a collapseable box, e.g.
 * if it's opened, it'll be closed, and vice versa.
 * 
 * @param boxID Identifier of box
 */
function switchState(boxID) {
  var boxObj = getElementObject(boxID);
  var buttonObj = getElementObject(boxID+B_SFIX);
  if (boxObj == null || buttonObj == null) {
     // Box or button not found
  } else if (boxObj.style.display=="none") {
     // Box is closed, so open it
     openBox(boxObj, buttonObj);
  } else if (boxObj.style.display=="block") {
     // Box is opened, so close it
     closeBox(boxObj, buttonObj);
  }
}

/**
 * Closes all boxes in a given list.
 * 
 * @param boxList Array of box IDs
 */
function collapseAll(boxList) {
  var idx;
  for (idx = 0; idx < boxList.length; idx++) {
     var boxObj = getElementObject(boxList[idx]);
     var buttonObj = getElementObject(boxList[idx]+B_SFIX);
     closeBox(boxObj, buttonObj);
  }
}

/**
 * Open all boxes in a given list.
 * 
 * @param boxList Array of box IDs
 */
function expandAll(boxList) {
  var idx;
  for (idx = 0; idx < boxList.length; idx++) {
     var boxObj = getElementObject(boxList[idx]);
     var buttonObj = getElementObject(boxList[idx]+B_SFIX);
     openBox(boxObj, buttonObj);
  }
}

/**
 * Makes all the control buttons of boxes appear.
 * 
 * @param boxList Array of box IDs
 */
function viewControlButtons(boxList) {
    var idx;
    for (idx = 0; idx < boxList.length; idx++) {
        buttonObj = getElementObject(boxList[idx]+B_SFIX);
        if (buttonObj != null) {
            buttonObj.style.display = "inline";
        }
    }
}

/**
 * Makes all the control buttons of boxes disappear.
 * 
 * @param boxList Array of box IDs
 */
function hideControlButtons(boxList) {
    var idx;
    for (idx = 0; idx < boxList.length; idx++) {
        buttonObj = getElementObject(boxList[idx]+B_SFIX);
        if (buttonObj != null) {
            buttonObj.style.display = "none";
        }
    }
}

/**
 * Sets the page for either printing mode
 * or viewing mode. In printing mode, the page
 * is made to be more readable when printing it out.
 * In viewing mode, the page is more browsable.
 *
 * @param isPrinterVersion If true, display in
 *                                 printing mode; otherwise, 
 *                                 in viewing mode
 */
function displayMode(isPrinterVersion) {
    var obj;
    if (isPrinterVersion) {
        // Hide global control buttons
        obj = getElementObject("globalControls");
        if (obj != null) {
            obj.style.visibility = "hidden";
        }
        // Hide Legend
        obj = getElementObject("legend");
        if (obj != null) {
            obj.style.display = "none";
        }
        obj = getElementObject("legendTOC");
        if (obj != null) {
            obj.style.display = "none";
        }
        // Hide Glossary
        obj = getElementObject("glossary");
        if (obj != null) {
            obj.style.display = "none";
        }
        obj = getElementObject("glossaryTOC");
        if (obj != null) {
            obj.style.display = "none";
        }

        // Expand all XML Instance Representation tables
        expandAll(xiBoxes);
        // Expand all Schema Component Representation tables
        expandAll(scBoxes);

        // Hide Control buttons
        hideControlButtons(xiBoxes);
        hideControlButtons(scBoxes);
    } else {
        // View global control buttons
        obj = getElementObject("globalControls");
        if (obj != null) {
            obj.style.visibility = "visible";
        }
        // View Legend
        obj = getElementObject("legend");
        if (obj != null) {
            obj.style.display = "block";
        }
        obj = getElementObject("legendTOC");
        if (obj != null) {
            obj.style.display = "block";
        }
        // View Glossary
        obj = getElementObject("glossary");
        if (obj != null) {
            obj.style.display = "block";
        }
        obj = getElementObject("glossaryTOC");
        if (obj != null) {
            obj.style.display = "block";
        }

        // Expand all XML Instance Representation tables
        expandAll(xiBoxes);
        // Collapse all Schema Component Representation tables
        collapseAll(scBoxes);

        // View Control buttons
        viewControlButtons(xiBoxes);
        viewControlButtons(scBoxes);
    }
}

/**
 * Opens up a window displaying the documentation
 * of a schema component in the XML Instance
 * Representation table.
 * 
 * @param compDesc      Description of schema component 
 * @param compName      Name of schema component 
 * @param docTextArray Array containing the paragraphs 
 *                           of the new document
 */
function viewDocumentation(compDesc, compName, docTextArray) {
  var width = 400;
  var height = 200;
  var locX = 100;
  var locY = 200;

  /* Generate content */
  var actualText = "<html>";
  actualText += "<head><title>";
  actualText += compDesc;
  if (compName != '') {
     actualText += ": " + compName;
  }
  actualText += "</title></head>";
  actualText += "<body bgcolor=\"#FFFFEE\">";
  // Title
  actualText += "<p style=\"font-family: Arial, sans-serif; font-size: 12pt; font-weight: bold; letter-spacing:1px;\">";
  actualText += compDesc;
  if (compName != '') {
     actualText += ": <span style=\"color:#006699\">" + compName + "</span>";
  }
  actualText += "</p>";
  // Documentation
  var idx;
  for (idx = 0; idx < docTextArray.length; idx++) {
     actualText += "<p style=\"font-family: Arial, sans-serif; font-size: 10pt;\">" + docTextArray[idx] + "</p>";
  }
  // Link to close window
  actualText += "<a href=\"javascript:void(0)\" onclick=\"window.close();\" style=\"font-family: Arial, sans-serif; font-size: 8pt;\">Close</a>";
  actualText += "</body></html>";

  /* Display window */
  windowCount++;
  var docWindow = window.open("", "documentation"+windowCount, "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable,alwaysRaised,dependent,titlebar=no,width="+width+",height="+height+",screenX="+locX+",left="+locX+",screenY="+locY+",top="+locY);
  docWindow.document.write(actualText);
}