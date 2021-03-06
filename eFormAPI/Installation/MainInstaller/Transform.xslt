﻿<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:wix="http://schemas.microsoft.com/wix/2006/wi" xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">

  <xsl:output method="xml" indent="yes"/>
  <xsl:strip-space elements="*"/>
  
  <xsl:template match="@*|node()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

  <xsl:key name="files-search" match="wix:Component[not(contains(wix:File/@Source, '.config')) and not(contains(wix:File/@Source, '.asax')) and not(contains(wix:File/@Source, '.dll')) and not(contains(wix:File/@Source, '.jar'))]" use="@Id"/>
  <xsl:key name="files-search" match="wix:Component[contains(wix:File/@Source, '.cs')]" use="@Id"/>
  <xsl:key name="files-search" match="wix:Component[contains(wix:File/@Source,'Web.Release.config')]" use="@Id"/>
  <xsl:key name="files-search" match="wix:Component[contains(wix:File/@Source,'Web.Debug.config')]" use="@Id"/>
  <xsl:key name="dir-search" match="wix:Component[ancestor::wix:Directory/@Name != 'bin']" use="@Id"/>

  <xsl:template match="wix:Component[key('files-search', @Id)]"/>
  <xsl:template match="wix:ComponentRef[key('files-search', @Id)]"/>
  
  <xsl:template match="wix:Directory[@Name != 'bin']"/>
  <xsl:template match="wix:ComponentRef[key('dir-search', @Id)]"/>
</xsl:stylesheet>