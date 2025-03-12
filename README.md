<h1 id="TOP">🗃️: Gramps Data Model Diagram (<a href="https://github.com/mod-by-cis/gramps-data-model">github.com/mod-by-cis/gramps-data-model</a>) </h1>

Graphical representation of the data model in the gramps genealogy program.
I did not understand the of relation in gramps-data, until I exploring by creating a diagram - [**CC0 - Shared under Creative Commons Zero terms**](https://creativecommons.org/public-domain/cc0/). ***I don't claim any rights if it helps anyone, I just wanted to share it in case it might help someone.***

> ⚠️ The license does not apply to the `./model` folder. The **DTD** and **RNG** files are copies of the files in the `./data` folder in the **gramps repository** and are subject to the license of that repository. The remaining files in the `./model` folder are converted from the official **DTD** and **RNG** files from the `./data` folder in the **gramps** repository.

<h2 id="index">📌: Index</h2>
<ul>
  <li>
    <a href="#AboutGramps"><button>0️⃣: About Gramps</button></a>
  </li>
  <li>
    <a href="#GrampsDataModelDiagram"><button>1️⃣: Gramps Data Model Diagram</button></a>
    <span> >>> </span>
    <a href="#GrampsDataModelDiagramEN25"><button>(eng v2025)</button></a>
    <span> | </span>
    <a href="#GrampsDataModelDiagramPL25"><button>(pol v2025)</button></a>
    <span> | </span>
    <a href="#GrampsDataModelDiagramPL18"><button>(pol v2018)</button></a>
  </li>
  <li>
    <a href="#GrampsXmlOfficialDtdAndRng"><button>2️⃣: Official Files of GrampsXML Data Model DTD and RNG</button></a>
  </li>
  <li>
    <a href="#ConvertedFromOfficialDtdAndRng"><button>3️⃣: Files converted from official DTD and RNG GrampsXML</button></a>
  </li>
</ul>

<hr style="height: 65px; background-color: lightgrey; border: none; margin: 40px 0;"/>

<a href="#TOP"><button>🔝back to TOP</button></a>

<h2 id="AboutGramps">0️⃣: About Gramps</h2>

Gramps (Genealogical Research and Analysis Management Programming System) – is one of the most advanced genealogy programs, surpassing others in terms of complexity. Moreover, it is available for free.

- **[gramps-project.org]**
  - [👁️ The official website of the Gramps program (https://gramps-project.org/blog/)](https://gramps-project.org/blog/)
  - [👁️ Manual for Gramps (https://gramps-project.org/wiki/index.php/)](https://gramps-project.org/wiki/index.php/)
  - [👁️ Reporting bugs and technical support (https://gramps-project.org/bugs)](https://gramps-project.org/bugs)
  - [👁️ Release history of Gramps (https://gramps-project.org/wiki/index.php?title=Previous_releases_of_Gramps)](https://gramps-project.org/wiki/index.php?title=Previous_releases_of_Gramps)
  - [👁️ Official description of the Gramps-XML format (https://gramps-project.org/wiki/index.php/Gramps_XML)](https://gramps-project.org/wiki/index.php/Gramps_XML)
- **[github.com]**
  - [👁️ The repository for Gramps (https://github.com/gramps-project/gramps)](https://github.com/gramps-project/gramps)
  - [👁️ Repository gramps-web (https://github.com/gramps-project/gramps-web)](https://github.com/gramps-project/gramps-web)
  - [👁️ Repository gramps-web-api (https://github.com/gramps-project/gramps-web-api)](https://github.com/gramps-project/gramps-web-api)
  - [👁️ Documentation for file format Gramps XML (https://raw.githubusercontent.com/gramps-project/gramps/refs/heads/master/data/grampsxml.dtd)](https://raw.githubusercontent.com/gramps-project/gramps/refs/heads/master/data/grampsxml.dtd)
  - [👁️ Documentation for file format Gramps XML (https://raw.githubusercontent.com/gramps-project/gramps/refs/heads/master/data/grampsxml.rng)](https://raw.githubusercontent.com/gramps-project/gramps/refs/heads/master/data/grampsxml.rng)
- [👁️ Discourse group (https://gramps.discourse.group/)](https://gramps.discourse.group/)
- [👁️ Discourse group (https://www.facebook.com/groups/370692133138445)](https://www.facebook.com/groups/370692133138445)
- [👁️ gramps-web (https://www.grampsweb.org/)](https://www.grampsweb.org/)
- [👁️ gramps-hub (https://www.grampshub.com/)](https://www.grampshub.com/)
- [👁️ There are also various tutorials on YouTube. (eg. https://www.youtube.com/@tech-tutorials/videos)](https://www.youtube.com/@tech-tutorials/videos)
- **[not official]**
  - [👁️ About of **Gramps** in polish language **[not official]** (https://www.cisowscy.com/gene/gramps)](https://www.cisowscy.com/gene/gramps)
  - [👁️ About of **Gramps** in english language **[not official]** (https://www.cisowscy.com/gene/gramps-eng)](https://www.cisowscy.com/gene/gramps-eng)

<hr style="height: 65px; background-color: lightgrey; border: none; margin: 40px 0;"/>

<a href="#TOP"><button>🔝back to TOP</button></a>

<h2 id="GrampsDataModelDiagram">1️⃣: <a href="https://github.com/gramps-project/gramps/releases">Gramps</a> Data Model Diagram</h2>

The graphs of the data model were created in the free **yEd** programme of the **yWorks**. [yEd - live](https://www.yworks.com/yed-live/), [yEd - downloads](https://www.yworks.com/products/yed/download).

<a href="#TOP"><button>🔝back to TOP</button></a>

<h3 id="GrampsDataModelDiagramEN25">1️⃣-en-25: Gramps Data Model Diagram (lang: english; v.2025-02-27)</h3>

![Grams Data Model Diagram (lang: english; v.2025-02-27)](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-6.0.0_MODEL_(eng).png)

> diagram available in format:
>
> - `.graphml`:  [📥💾 **gramps-6.0.0_MODEL_(eng).graphml**](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-6.0.0_MODEL_(eng).graphml) - - - - - - - *The free program **`yEd`** is required to open the original `.graphml` file.*
> - `.svg`:  [📥💾 **gramps-6.0.0_MODEL_(eng).svg**](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-6.0.0_MODEL_(eng).svg)
> - `.png`:  [📥💾 **gramps-6.0.0_MODEL_(eng).png**](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-6.0.0_MODEL_(eng).png)
> - `.jpg`:  [📥💾 **gramps-6.0.0_MODEL_(eng).jpg**](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-6.0.0_MODEL_(eng).jpg)
> - `.pdf (text plain)`:  [📥💾 **gramps-6.0.0_MODEL_(eng)_text-plain.pdf**](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-6.0.0_MODEL_(eng)_text-plain.pdf)
> - `.pdf (text vectorized)`:  [📥💾 **gramps-6.0.0_MODEL_(eng)_text-vectorized.pdf**](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-6.0.0_MODEL_(eng)_text-vectorized.pdf)

<hr style="height: 15px; background-color: lightgrey; border: none; margin: 40px 0;"/>

<a href="#TOP"><button>🔝back to TOP</button></a>

<h3 id="GrampsDataModelDiagramPL25">1️⃣-pl-25: Gramps Data Model Diagram (lang: polish; v.2025-02-27)</h3>

![Grams Data Model Diagram (lang: polish; v.2025-02-27)](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-6.0.0_MODEL_(pol).png)

> diagram available in format:
>
> - `.graphml`:  [📥💾 **gramps-6.0.0_MODEL_(pol).graphml**](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-6.0.0_MODEL_(pol).graphml) - - - - - - - *The free program **`yEd`** is required to open the original `.graphml` file.*
> - `.svg`:  [📥💾 **gramps-6.0.0_MODEL_(pol).svg**](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-6.0.0_MODEL_(pol).svg)
> - `.png`:  [📥💾 **gramps-6.0.0_MODEL_(pol).png**](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-6.0.0_MODEL_(pol).png)
> - `.jpg`:  [📥💾 **gramps-6.0.0_MODEL_(pol).jpg**](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-6.0.0_MODEL_(pol).jpg)
> - `.pdf (text plain)`:  [📥💾 **gramps-6.0.0_MODEL_(pol)_text-plain.pdf**](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-6.0.0_MODEL_(pol)_text-plain.pdf)
> - `.pdf (text vectorized)`:  [📥💾 **gramps-6.0.0_MODEL_(pol)_text-vectorized.pdf**](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-6.0.0_MODEL_(pol)_text-vectorized.pdf)

<hr style="height: 15px; background-color: lightgrey; border: none; margin: 40px 0;"/>

<a href="#TOP"><button>🔝back to TOP</button></a>

<h3 id="GrampsDataModelDiagramPL18">1️⃣-pl-18: Gramps Data Model Diagram (lang: polish; v.2018-10-21)</h3>

![Gramps Data Model Diagram (lang: polish; v.2018-10-21)](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-5.0.0_MODEL_(pol).png)

> diagram available in format:
>
> - `.graphml`:  [📥💾 **gramps-5.0.0_MODEL_(pol).graphml**](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-5.0.0_MODEL_(pol).graphml) - - - - - - - *The free program **`yEd`** is required to open the original `.graphml` file.*
> - `.png`:  [📥💾 **gramps-5.0.0_MODEL_(pol).png**](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-5.0.0_MODEL_(pol).png)
> - `.pdf (text vectorized)`:  [📥💾 **gramps-5.0.0_MODEL_(pol).pdf**](https://raw.githubusercontent.com/mod-by-cis/gramps-data-model/refs/tags/gramps-v.6.0.0-beta.2_chart-data-model-v.2025-02-17/gramps-5.0.0_MODEL_(pol).pdf)

<hr style="height: 65px; background-color: lightgrey; border: none; margin: 40px 0;"/>

<a href="#TOP"><button>🔝back to TOP</button></a>

<h2 id="GrampsXmlOfficialDtdAndRng">2️⃣: official grampsxml data model files (the model used in gramps): <code>*.dtd</code> and <code>*.rng</code></h2>

The official *GRAMPS* repository contains the data model for the `*.gramps` file in both **DTD** and **RNG** formats. I am including these files as copies from the official repository to serve as the foundation for outlining the dependency model. The table shows the latest versions of gramps that use a given model.

<table border="1">
  <tr>
    <th>gramps:</br> grampsxml:</th>
    <th>🕒</th>  
    <th><a href="https://github.com/gramps-project/gramps/blob/v6.0.0-rc1/">v6.0.0-rc1</a></br> v1.7.2</th>
    <th><a href="https://github.com/gramps-project/gramps/blob/v5.1.6/">v5.1.6</a></br> v1.7.1</th>
    <th><a href="https://github.com/gramps-project/gramps/blob/v4.1.3/">v4.1.3</a></br> v1.6.0</th>
    <th><a href="https://github.com/gramps-project/gramps/blob/v4.0.4/">v4.0.4</a></br> v1.5.1</th>
    <th><a href="https://github.com/gramps-project/gramps/blob/v4.0.1/">v4.0.1</a></br> v1.5.0</th>
    <th><a href="https://github.com/gramps-project/gramps/blob/v3.4.5/">v3.4.5</a></br> v1.5.0</th>
    <th><a href="https://github.com/gramps-project/gramps/blob/v3.3.1/">v3.3.1</a></br> v1.4.0</th>
    <th><a href="https://github.com/gramps-project/gramps/blob/v3.2.6/">v3.2.6</a></br> v1.3.0</th>
    <th><a href="https://github.com/gramps-project/gramps/blob/v3.0.4/">v3.0.4</a></br> v1.2.0</th>
    <th><a href="https://github.com/gramps-project/gramps/blob/v2.2.10/">v2.2.10</a></br> v1.1.4</th>
  </tr>
  <tr>
    <!-- cSpell:disable -->
    <th><span style="color:violet; font-weight:bold">D</span><span style="font-weight:normal">ocument </span><span style="color:violet; font-weight:bold">T</span><span style="font-weight:normal">ype </span><span style="color:violet; font-weight:bold">D</span><span style="font-weight:normal">efinition</span></th>
    <!-- cSpell:enable -->
    <th><a href="https://github.com/gramps-project/gramps/commits/master/data/grampsxml.dtd">🔄️</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v6.0.0-rc1/data/grampsxml.dtd">📜.dtd</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v5.1.6/data/grampsxml.dtd">📜.dtd</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v4.1.3/data/grampsxml.dtd">📜.dtd</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v4.0.4/data/grampsxml.dtd">📜.dtd</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v4.0.1/data/grampsxml.dtd">📜.dtd</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v3.4.5/data/grampsxml.dtd">📜.dtd</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v3.3.1/data/grampsxml.dtd">📜.dtd</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v3.2.6/data/grampsxml.dtd">📜.dtd</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v3.0.4/data/grampsxml.dtd">📜.dtd</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v2.2.10/data/grampsxml.dtd">📜.dtd</a></td>
  </tr>
  <tr>
    <!-- cSpell:disable -->
    <th><span style="color:violet; font-weight:bold">R</span><span style="font-weight:normal">elax </span><span style="color:violet; font-weight:bold">NG</span></th>
    <!-- cSpell:enable -->
    <th><a href="https://github.com/gramps-project/gramps/commits/master/data/grampsxml.rng">🔄️</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v6.0.0-rc1/data/grampsxml.rng">📜.rng</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v5.1.6/data/grampsxml.rng">📜.rng</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v4.1.3/data/grampsxml.rng">📜.rng</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v4.0.4/data/grampsxml.rng">📜.dtd</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v4.0.1/data/grampsxml.rng">📜.dtd</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v3.4.5/data/grampsxml.rng">📜.dtd</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v3.3.1/data/grampsxml.rng">📜.dtd</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v3.2.6/data/grampsxml.rng">📜.dtd</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v3.0.4/data/grampsxml.rng">📜.dtd</a></td>
    <td><a href="https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v2.2.10/data/grampsxml.rng">📜.dtd</a></td>
  </tr>
</table>

<hr style="height: 25px; background-color: lightgrey; border: none; margin: 40px 0;"/>

<a href="#TOP"><button>🔝back to TOP</button></a>

<h2 id="ConvertedFromOfficialDtdAndRng">3️⃣: files converted from official <code>*.dtd</code> and <code>*.rng</code> <br/> all files in folder: <code>./model/**/</code></h3>

> - to convert `*.DTD` to `*.DTD.XSD`, I used 30 days trial version, [XMLSpy-by-altova](https://www.altova.com/xmlspy-xml-editor)
> - to convert `*.DTD.XSD` to `*.DTD.XSD.JSON`, I used script `./utils/download-official-DTD-RNG.ts`
> - to generate diagram `*.DTD.XSD.JPG` from `*.DTD.XSD`, I used trial version, [Stylus Studio](http://www.stylusstudio.com/)
>
>
> - to convert `*.RNG` to `*.RNG.XSD` and to `*.RNG.XSD.JSON`, I used  script `./utils/covert_RNG_toXSD_andToJSON.ts`  (this script uses external tool **jing-trang** [download from..](https://code.google.com/archive/p/jing-trang/downloads) [It might be a copy from..](https://github.com/relaxng/jing-trang))
> -

<table border="1">  
  <tr>
    <th>DTD (Document type definition)</th>
    <td><a href="https://github.com/mod-by-cis/gramps-data-model/blob/main/model/grampsxml%40v1.7.2/grampsxml.dtd">📜.dtd</a></td>
    <td><i><code>grampsxml.dtd</code> mirror from <u>official repo of gramps</u> using <u><code>./utils/covert_DTD-XSD_toJSON.ts</code></u></i></td>
  </tr>
  <tr>
    <th>XSD (XML Schema)</th>
    <td><a href="https://github.com/mod-by-cis/gramps-data-model/blob/main/model/grampsxml%40v1.7.2/grampsxml.dtd.xsd">📜.dtd.xsd</a></td>
    <td><i>converted from <code>grampsxml.dtd</code> using <u>XMLSpy-by-altova</u></i></td>
  </tr>
  <tr>
    <th>XSD (XML Schema) as JSON</th>
    <td><a href="https://github.com/mod-by-cis/gramps-data-model/blob/main/model/grampsxml%40v1.7.2/grampsxml.dtd.xsd.json">📜.dtd.xsd.json</a></td>
    <td><i>converted from <code>grampsxml.dtd.xsd</code> using <u><code>./utils/covert_DTD-XSD_toJSON.ts</code></u></i></td>
  </tr>
  <tr>
    <td colspan="3"><hr/></th>
  </tr>
  <tr>
    <th>RNG (RELAX NG schema)</th>
    <td><a href="https://github.com/mod-by-cis/gramps-data-model/blob/main/model/grampsxml%40v1.7.2/grampsxml.rng">📜.rng</a></td>
    <td><i><code>grampsxml.rng</code> mirror from <u>official repo of gramps</u> using <u><code>./utils/covert_DTD-XSD_toJSON.ts</code></u></i></td>
  </tr>
  <tr>
    <th>RNG (RELAX NG schema) as JSON</th>
    <td><a href="https://github.com/mod-by-cis/gramps-data-model/blob/main/model/grampsxml%40v1.7.2/grampsxml.rng.json">📜.rng.json</a></td>
    <td><i>converted from <code>grampsxml.rng</code> when file was downloading using <u><code>./utils/download-official-DTD-RNG.ts</code></u></i></td>
  </tr>
  <tr>
    <th>XSD (XML Schema)</th>
    <td><a href="https://github.com/mod-by-cis/gramps-data-model/blob/main/model/grampsxml%40v1.7.2/grampsxml.rng.xsd">📜.rng.xsd</a></td>
    <td><i>converted from <code>grampsxml.rng</code> using <u><code>./utils/covert_RNG_toXSD_andToJSON.ts</code></u></i></td>
  </tr>
  <tr>
    <th>XSD (XML Schema) as JSON</th>
    <td><a href="https://github.com/mod-by-cis/gramps-data-model/blob/main/model/grampsxml%40v1.7.2/grampsxml.rng.xsd.json">📜.rng.xsd.json</a></td>
    <td><i>converted from <code>grampsxml.rng.xsd</code> using <u><code>./utils/covert_RNG_toXSD_andToJSON.ts</code></u></i></td>
  </tr>
</table>

<hr style="height: 65px; background-color: lightgrey; border: none; margin: 40px 0;"/>

<a href="#TOP"><button>🔝back to TOP</button></a>
