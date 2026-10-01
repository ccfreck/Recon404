export type Category = "advisories" | "analysis" | "news" | "research";
export type Priority = "CRITICAL" | "HIGH" | "MEDIUM";

export interface FeedSource {
  name: string;
  url: string;
  category: Category;
  priority: Priority;
}

export const FEEDS: FeedSource[] = [
  // advisories
  { name: "CISA Current Activity", url: "https://www.cisa.gov/uscert/ncas/current-activity.xml", category: "advisories", priority: "CRITICAL" },
  { name: "Ivanti Security Advisories", url: "https://www.ivanti.com/blog/topics/security-advisory/rss", category: "advisories", priority: "HIGH" },
  { name: "SANS Internet Storm Center", url: "https://isc.sans.edu/rssfeed.xml", category: "advisories", priority: "HIGH" },
  { name: "US-CERT Alerts", url: "https://www.cisa.gov/uscert/ncas/alerts.xml", category: "advisories", priority: "CRITICAL" },
  // analysis
  { name: "Dark Reading", url: "https://www.darkreading.com/rss.xml", category: "analysis", priority: "MEDIUM" },
  { name: "Krebs on Security", url: "https://krebsonsecurity.com/feed/", category: "analysis", priority: "HIGH" },
  { name: "The DFIR Report", url: "https://thedfirreport.com/feed/", category: "analysis", priority: "CRITICAL" },
  // news
  { name: "Bleeping Computer", url: "https://www.bleepingcomputer.com/feed/", category: "news", priority: "MEDIUM" },
  { name: "Security Affairs (Data Breach)", url: "https://securityaffairs.co/wordpress/category/data-breach/feed", category: "news", priority: "MEDIUM" },
  { name: "SecurityWeek", url: "https://www.securityweek.com/feed/", category: "news", priority: "MEDIUM" },
  { name: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews", category: "news", priority: "MEDIUM" },
  { name: "Threatpost", url: "https://threatpost.com/feed/", category: "news", priority: "MEDIUM" },
  // research
  { name: "Arctic Wolf Labs", url: "https://arcticwolf.com/resources/category/blog/rss/", category: "research", priority: "MEDIUM" },
  { name: "Bitdefender Labs", url: "https://www.bitdefender.com/blog/api/rss/labs/", category: "research", priority: "MEDIUM" },
  { name: "Check Point Research", url: "https://research.checkpoint.com/feed/", category: "research", priority: "HIGH" },
  { name: "Cisco Talos Intelligence Group", url: "https://blog.talosintelligence.com/feed", category: "research", priority: "CRITICAL" },
  { name: "CrowdStrike Blog", url: "https://www.crowdstrike.com/blog/feed", category: "research", priority: "HIGH" },
  { name: "Didier Stevens", url: "https://blog.didierstevens.com/feed/", category: "research", priority: "HIGH" },
  { name: "ESET WeLiveSecurity", url: "https://www.welivesecurity.com/en/rss/feed/", category: "research", priority: "HIGH" },
  { name: "Exodus Intelligence", url: "https://blog.exodusintel.com/feed/", category: "research", priority: "CRITICAL" },
  { name: "Flashpoint Intel Blog", url: "https://flashpoint-intel.com/blog/rss", category: "research", priority: "HIGH" },
  { name: "FortiGuard Labs Threat Research", url: "https://feeds.fortinet.com/fortinet/blog/threat-research", category: "research", priority: "CRITICAL" },
  { name: "Fox-IT Blog", url: "http://blog.fox-it.com/feed/", category: "research", priority: "HIGH" },
  { name: "Google Threat Intelligence", url: "https://feeds.feedburner.com/threatintelligence/pvexyqv7v0v", category: "research", priority: "HIGH" },
  { name: "GreyNoise Blog", url: "https://www.greynoise.io/blog/rss.xml", category: "research", priority: "HIGH" },
  { name: "Kaspersky Securelist", url: "http://www.securelist.com/en/rss/allupdates", category: "research", priority: "MEDIUM" },
  { name: "Malware Traffic Analysis", url: "http://malware-traffic-analysis.net/blog-entries.rss", category: "research", priority: "HIGH" },
  { name: "Mandiant Frontline Blog", url: "https://www.mandiant.com/resources/blog/rss.xml", category: "research", priority: "CRITICAL" },
  { name: "Microsoft Security Blog", url: "https://www.microsoft.com/en-us/security/blog/feed/", category: "research", priority: "HIGH" },
  { name: "PortSwigger Research", url: "https://blog.portswigger.net/feeds/posts/default", category: "research", priority: "HIGH" },
  { name: "Project Discovery", url: "https://blog.projectdiscovery.io/rss/", category: "research", priority: "MEDIUM" },
  { name: "Qualys ThreatPROTECT", url: "https://threatprotect.qualys.com/feed", category: "research", priority: "HIGH" },
  { name: "Quarkslab Blog", url: "https://blog.quarkslab.com/feeds/all.rss.xml", category: "research", priority: "HIGH" },
  { name: "Rapid7 Security Research", url: "https://blog.rapid7.com/rss/", category: "research", priority: "HIGH" },
  { name: "Recorded Future", url: "https://www.recordedfuture.com/feed", category: "research", priority: "HIGH" },
  { name: "SentinelOne", url: "https://www.sentinelone.com/feed/", category: "research", priority: "HIGH" },
  { name: "Snyk Blog", url: "https://snyk.io/blog/feed/", category: "research", priority: "HIGH" },
  { name: "Tenable Research Advisories", url: "https://www.tenable.com/security/research/feed", category: "research", priority: "CRITICAL" },
  { name: "Trail of Bits", url: "https://blog.trailofbits.com/feed/", category: "research", priority: "HIGH" },
  { name: "Unit 42 (Palo Alto Networks)", url: "https://unit42.paloaltonetworks.com/feed/", category: "research", priority: "HIGH" },
  { name: "Wiz Security Research", url: "https://blog.wiz.io/rss/", category: "research", priority: "HIGH" },
];
