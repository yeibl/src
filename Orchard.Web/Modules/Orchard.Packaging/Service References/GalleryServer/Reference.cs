//------------------------------------------------------------------------------
// <auto-generated>
//     此代码由工具生成。
//     运行时版本:4.0.30319.42000
//
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
//------------------------------------------------------------------------------

// 原始文件名:
// 生成日期: 2018/7/21 22:15:59
namespace Orchard.Packaging.GalleryServer
{
    
    /// <summary>
    /// 架构中不存在 GalleryFeedContext 的注释。
    /// </summary>
    public partial class GalleryFeedContext : global::System.Data.Services.Client.DataServiceContext
    {
        /// <summary>
        /// 初始化新的 GalleryFeedContext 对象。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public GalleryFeedContext(global::System.Uri serviceRoot) : 
                base(serviceRoot)
        {
            this.ResolveName = new global::System.Func<global::System.Type, string>(this.ResolveNameFromType);
            this.ResolveType = new global::System.Func<string, global::System.Type>(this.ResolveTypeFromName);
            this.OnContextCreated();
        }
        partial void OnContextCreated();
        /// <summary>
        /// 因为在 Visual Studio 中为此服务引用配置的
        /// 命名空间与在服务器架构中指示的命名空间不同，所以
        /// 使用类型映射器在这两者之间进行映射。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        protected global::System.Type ResolveTypeFromName(string typeName)
        {
            if (typeName.StartsWith("Gallery.Infrastructure.FeedModels", global::System.StringComparison.Ordinal))
            {
                return this.GetType().Assembly.GetType(string.Concat("Orchard.Packaging.GalleryServer", typeName.Substring(33)), false);
            }
            return null;
        }
        /// <summary>
        /// 因为在 Visual Studio 中为此服务引用配置的
        /// 命名空间与在服务器架构中指示的命名空间不同，所以
        /// 使用类型映射器在这两者之间进行映射。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        protected string ResolveNameFromType(global::System.Type clientType)
        {
            if (clientType.Namespace.Equals("Orchard.Packaging.GalleryServer", global::System.StringComparison.Ordinal))
            {
                return string.Concat("Gallery.Infrastructure.FeedModels.", clientType.Name);
            }
            return null;
        }
        /// <summary>
        /// 架构中不存在 Packages 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public global::System.Data.Services.Client.DataServiceQuery<PublishedPackage> Packages
        {
            get
            {
                if ((this._Packages == null))
                {
                    this._Packages = base.CreateQuery<PublishedPackage>("Packages");
                }
                return this._Packages;
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private global::System.Data.Services.Client.DataServiceQuery<PublishedPackage> _Packages;
        /// <summary>
        /// 架构中不存在 Screenshots 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public global::System.Data.Services.Client.DataServiceQuery<PublishedScreenshot> Screenshots
        {
            get
            {
                if ((this._Screenshots == null))
                {
                    this._Screenshots = base.CreateQuery<PublishedScreenshot>("Screenshots");
                }
                return this._Screenshots;
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private global::System.Data.Services.Client.DataServiceQuery<PublishedScreenshot> _Screenshots;
        /// <summary>
        /// 架构中不存在 Packages 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public void AddToPackages(PublishedPackage publishedPackage)
        {
            base.AddObject("Packages", publishedPackage);
        }
        /// <summary>
        /// 架构中不存在 Screenshots 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public void AddToScreenshots(PublishedScreenshot publishedScreenshot)
        {
            base.AddObject("Screenshots", publishedScreenshot);
        }
    }
    /// <summary>
    /// 架构中不存在 Gallery.Infrastructure.FeedModels.PublishedPackage 的注释。
    /// </summary>
    /// <KeyProperties>
    /// Id
    /// Version
    /// </KeyProperties>
    [global::System.Data.Services.Common.DataServiceKeyAttribute("Id", "Version")]
    public partial class PublishedPackage
    {
        /// <summary>
        /// 创建新的 PublishedPackage 对象。
        /// </summary>
        /// <param name="ID">Id 的初始值。</param>
        /// <param name="version">Version 的初始值。</param>
        /// <param name="packageSize">PackageSize 的初始值。</param>
        /// <param name="price">Price 的初始值。</param>
        /// <param name="requireLicenseAcceptance">RequireLicenseAcceptance 的初始值。</param>
        /// <param name="isLatestVersion">IsLatestVersion 的初始值。</param>
        /// <param name="versionRating">VersionRating 的初始值。</param>
        /// <param name="versionRatingsCount">VersionRatingsCount 的初始值。</param>
        /// <param name="versionDownloadCount">VersionDownloadCount 的初始值。</param>
        /// <param name="created">Created 的初始值。</param>
        /// <param name="lastUpdated">LastUpdated 的初始值。</param>
        /// <param name="published">Published 的初始值。</param>
        /// <param name="rating">Rating 的初始值。</param>
        /// <param name="ratingsCount">RatingsCount 的初始值。</param>
        /// <param name="downloadCount">DownloadCount 的初始值。</param>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public static PublishedPackage CreatePublishedPackage(string ID, string version, long packageSize, decimal price, bool requireLicenseAcceptance, bool isLatestVersion, double versionRating, int versionRatingsCount, int versionDownloadCount, global::System.DateTime created, global::System.DateTime lastUpdated, global::System.DateTime published, double rating, int ratingsCount, int downloadCount)
        {
            PublishedPackage publishedPackage = new PublishedPackage();
            publishedPackage.Id = ID;
            publishedPackage.Version = version;
            publishedPackage.PackageSize = packageSize;
            publishedPackage.Price = price;
            publishedPackage.RequireLicenseAcceptance = requireLicenseAcceptance;
            publishedPackage.IsLatestVersion = isLatestVersion;
            publishedPackage.VersionRating = versionRating;
            publishedPackage.VersionRatingsCount = versionRatingsCount;
            publishedPackage.VersionDownloadCount = versionDownloadCount;
            publishedPackage.Created = created;
            publishedPackage.LastUpdated = lastUpdated;
            publishedPackage.Published = published;
            publishedPackage.Rating = rating;
            publishedPackage.RatingsCount = ratingsCount;
            publishedPackage.DownloadCount = downloadCount;
            return publishedPackage;
        }
        /// <summary>
        /// 架构中不存在属性 Id 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string Id
        {
            get
            {
                return this._Id;
            }
            set
            {
                this.OnIdChanging(value);
                this._Id = value;
                this.OnIdChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _Id;
        partial void OnIdChanging(string value);
        partial void OnIdChanged();
        /// <summary>
        /// 架构中不存在属性 Version 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string Version
        {
            get
            {
                return this._Version;
            }
            set
            {
                this.OnVersionChanging(value);
                this._Version = value;
                this.OnVersionChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _Version;
        partial void OnVersionChanging(string value);
        partial void OnVersionChanged();
        /// <summary>
        /// 架构中不存在属性 Title 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string Title
        {
            get
            {
                return this._Title;
            }
            set
            {
                this.OnTitleChanging(value);
                this._Title = value;
                this.OnTitleChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _Title;
        partial void OnTitleChanging(string value);
        partial void OnTitleChanged();
        /// <summary>
        /// 架构中不存在属性 Authors 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string Authors
        {
            get
            {
                return this._Authors;
            }
            set
            {
                this.OnAuthorsChanging(value);
                this._Authors = value;
                this.OnAuthorsChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _Authors;
        partial void OnAuthorsChanging(string value);
        partial void OnAuthorsChanged();
        /// <summary>
        /// 架构中不存在属性 PackageType 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string PackageType
        {
            get
            {
                return this._PackageType;
            }
            set
            {
                this.OnPackageTypeChanging(value);
                this._PackageType = value;
                this.OnPackageTypeChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _PackageType;
        partial void OnPackageTypeChanging(string value);
        partial void OnPackageTypeChanged();
        /// <summary>
        /// 架构中不存在属性 Summary 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string Summary
        {
            get
            {
                return this._Summary;
            }
            set
            {
                this.OnSummaryChanging(value);
                this._Summary = value;
                this.OnSummaryChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _Summary;
        partial void OnSummaryChanging(string value);
        partial void OnSummaryChanged();
        /// <summary>
        /// 架构中不存在属性 Description 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string Description
        {
            get
            {
                return this._Description;
            }
            set
            {
                this.OnDescriptionChanging(value);
                this._Description = value;
                this.OnDescriptionChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _Description;
        partial void OnDescriptionChanging(string value);
        partial void OnDescriptionChanged();
        /// <summary>
        /// 架构中不存在属性 Copyright 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string Copyright
        {
            get
            {
                return this._Copyright;
            }
            set
            {
                this.OnCopyrightChanging(value);
                this._Copyright = value;
                this.OnCopyrightChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _Copyright;
        partial void OnCopyrightChanging(string value);
        partial void OnCopyrightChanged();
        /// <summary>
        /// 架构中不存在属性 PackageHashAlgorithm 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string PackageHashAlgorithm
        {
            get
            {
                return this._PackageHashAlgorithm;
            }
            set
            {
                this.OnPackageHashAlgorithmChanging(value);
                this._PackageHashAlgorithm = value;
                this.OnPackageHashAlgorithmChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _PackageHashAlgorithm;
        partial void OnPackageHashAlgorithmChanging(string value);
        partial void OnPackageHashAlgorithmChanged();
        /// <summary>
        /// 架构中不存在属性 PackageHash 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string PackageHash
        {
            get
            {
                return this._PackageHash;
            }
            set
            {
                this.OnPackageHashChanging(value);
                this._PackageHash = value;
                this.OnPackageHashChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _PackageHash;
        partial void OnPackageHashChanging(string value);
        partial void OnPackageHashChanged();
        /// <summary>
        /// 架构中不存在属性 PackageSize 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public long PackageSize
        {
            get
            {
                return this._PackageSize;
            }
            set
            {
                this.OnPackageSizeChanging(value);
                this._PackageSize = value;
                this.OnPackageSizeChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private long _PackageSize;
        partial void OnPackageSizeChanging(long value);
        partial void OnPackageSizeChanged();
        /// <summary>
        /// 架构中不存在属性 Price 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public decimal Price
        {
            get
            {
                return this._Price;
            }
            set
            {
                this.OnPriceChanging(value);
                this._Price = value;
                this.OnPriceChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private decimal _Price;
        partial void OnPriceChanging(decimal value);
        partial void OnPriceChanged();
        /// <summary>
        /// 架构中不存在属性 RequireLicenseAcceptance 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public bool RequireLicenseAcceptance
        {
            get
            {
                return this._RequireLicenseAcceptance;
            }
            set
            {
                this.OnRequireLicenseAcceptanceChanging(value);
                this._RequireLicenseAcceptance = value;
                this.OnRequireLicenseAcceptanceChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private bool _RequireLicenseAcceptance;
        partial void OnRequireLicenseAcceptanceChanging(bool value);
        partial void OnRequireLicenseAcceptanceChanged();
        /// <summary>
        /// 架构中不存在属性 IsLatestVersion 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public bool IsLatestVersion
        {
            get
            {
                return this._IsLatestVersion;
            }
            set
            {
                this.OnIsLatestVersionChanging(value);
                this._IsLatestVersion = value;
                this.OnIsLatestVersionChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private bool _IsLatestVersion;
        partial void OnIsLatestVersionChanging(bool value);
        partial void OnIsLatestVersionChanged();
        /// <summary>
        /// 架构中不存在属性 VersionRating 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public double VersionRating
        {
            get
            {
                return this._VersionRating;
            }
            set
            {
                this.OnVersionRatingChanging(value);
                this._VersionRating = value;
                this.OnVersionRatingChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private double _VersionRating;
        partial void OnVersionRatingChanging(double value);
        partial void OnVersionRatingChanged();
        /// <summary>
        /// 架构中不存在属性 VersionRatingsCount 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public int VersionRatingsCount
        {
            get
            {
                return this._VersionRatingsCount;
            }
            set
            {
                this.OnVersionRatingsCountChanging(value);
                this._VersionRatingsCount = value;
                this.OnVersionRatingsCountChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private int _VersionRatingsCount;
        partial void OnVersionRatingsCountChanging(int value);
        partial void OnVersionRatingsCountChanged();
        /// <summary>
        /// 架构中不存在属性 VersionDownloadCount 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public int VersionDownloadCount
        {
            get
            {
                return this._VersionDownloadCount;
            }
            set
            {
                this.OnVersionDownloadCountChanging(value);
                this._VersionDownloadCount = value;
                this.OnVersionDownloadCountChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private int _VersionDownloadCount;
        partial void OnVersionDownloadCountChanging(int value);
        partial void OnVersionDownloadCountChanged();
        /// <summary>
        /// 架构中不存在属性 Created 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public global::System.DateTime Created
        {
            get
            {
                return this._Created;
            }
            set
            {
                this.OnCreatedChanging(value);
                this._Created = value;
                this.OnCreatedChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private global::System.DateTime _Created;
        partial void OnCreatedChanging(global::System.DateTime value);
        partial void OnCreatedChanged();
        /// <summary>
        /// 架构中不存在属性 LastUpdated 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public global::System.DateTime LastUpdated
        {
            get
            {
                return this._LastUpdated;
            }
            set
            {
                this.OnLastUpdatedChanging(value);
                this._LastUpdated = value;
                this.OnLastUpdatedChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private global::System.DateTime _LastUpdated;
        partial void OnLastUpdatedChanging(global::System.DateTime value);
        partial void OnLastUpdatedChanged();
        /// <summary>
        /// 架构中不存在属性 Published 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public global::System.DateTime Published
        {
            get
            {
                return this._Published;
            }
            set
            {
                this.OnPublishedChanging(value);
                this._Published = value;
                this.OnPublishedChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private global::System.DateTime _Published;
        partial void OnPublishedChanging(global::System.DateTime value);
        partial void OnPublishedChanged();
        /// <summary>
        /// 架构中不存在属性 ExternalPackageUrl 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string ExternalPackageUrl
        {
            get
            {
                return this._ExternalPackageUrl;
            }
            set
            {
                this.OnExternalPackageUrlChanging(value);
                this._ExternalPackageUrl = value;
                this.OnExternalPackageUrlChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _ExternalPackageUrl;
        partial void OnExternalPackageUrlChanging(string value);
        partial void OnExternalPackageUrlChanged();
        /// <summary>
        /// 架构中不存在属性 ProjectUrl 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string ProjectUrl
        {
            get
            {
                return this._ProjectUrl;
            }
            set
            {
                this.OnProjectUrlChanging(value);
                this._ProjectUrl = value;
                this.OnProjectUrlChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _ProjectUrl;
        partial void OnProjectUrlChanging(string value);
        partial void OnProjectUrlChanged();
        /// <summary>
        /// 架构中不存在属性 LicenseUrl 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string LicenseUrl
        {
            get
            {
                return this._LicenseUrl;
            }
            set
            {
                this.OnLicenseUrlChanging(value);
                this._LicenseUrl = value;
                this.OnLicenseUrlChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _LicenseUrl;
        partial void OnLicenseUrlChanging(string value);
        partial void OnLicenseUrlChanged();
        /// <summary>
        /// 架构中不存在属性 IconUrl 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string IconUrl
        {
            get
            {
                return this._IconUrl;
            }
            set
            {
                this.OnIconUrlChanging(value);
                this._IconUrl = value;
                this.OnIconUrlChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _IconUrl;
        partial void OnIconUrlChanging(string value);
        partial void OnIconUrlChanged();
        /// <summary>
        /// 架构中不存在属性 Rating 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public double Rating
        {
            get
            {
                return this._Rating;
            }
            set
            {
                this.OnRatingChanging(value);
                this._Rating = value;
                this.OnRatingChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private double _Rating;
        partial void OnRatingChanging(double value);
        partial void OnRatingChanged();
        /// <summary>
        /// 架构中不存在属性 RatingsCount 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public int RatingsCount
        {
            get
            {
                return this._RatingsCount;
            }
            set
            {
                this.OnRatingsCountChanging(value);
                this._RatingsCount = value;
                this.OnRatingsCountChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private int _RatingsCount;
        partial void OnRatingsCountChanging(int value);
        partial void OnRatingsCountChanged();
        /// <summary>
        /// 架构中不存在属性 DownloadCount 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public int DownloadCount
        {
            get
            {
                return this._DownloadCount;
            }
            set
            {
                this.OnDownloadCountChanging(value);
                this._DownloadCount = value;
                this.OnDownloadCountChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private int _DownloadCount;
        partial void OnDownloadCountChanging(int value);
        partial void OnDownloadCountChanged();
        /// <summary>
        /// 架构中不存在属性 Categories 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string Categories
        {
            get
            {
                return this._Categories;
            }
            set
            {
                this.OnCategoriesChanging(value);
                this._Categories = value;
                this.OnCategoriesChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _Categories;
        partial void OnCategoriesChanging(string value);
        partial void OnCategoriesChanged();
        /// <summary>
        /// 架构中不存在属性 Tags 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string Tags
        {
            get
            {
                return this._Tags;
            }
            set
            {
                this.OnTagsChanging(value);
                this._Tags = value;
                this.OnTagsChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _Tags;
        partial void OnTagsChanging(string value);
        partial void OnTagsChanged();
        /// <summary>
        /// 架构中不存在属性 Dependencies 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string Dependencies
        {
            get
            {
                return this._Dependencies;
            }
            set
            {
                this.OnDependenciesChanging(value);
                this._Dependencies = value;
                this.OnDependenciesChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _Dependencies;
        partial void OnDependenciesChanging(string value);
        partial void OnDependenciesChanged();
        /// <summary>
        /// 架构中不存在属性 ReportAbuseUrl 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string ReportAbuseUrl
        {
            get
            {
                return this._ReportAbuseUrl;
            }
            set
            {
                this.OnReportAbuseUrlChanging(value);
                this._ReportAbuseUrl = value;
                this.OnReportAbuseUrlChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _ReportAbuseUrl;
        partial void OnReportAbuseUrlChanging(string value);
        partial void OnReportAbuseUrlChanged();
        /// <summary>
        /// 架构中不存在属性 GalleryDetailsUrl 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string GalleryDetailsUrl
        {
            get
            {
                return this._GalleryDetailsUrl;
            }
            set
            {
                this.OnGalleryDetailsUrlChanging(value);
                this._GalleryDetailsUrl = value;
                this.OnGalleryDetailsUrlChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _GalleryDetailsUrl;
        partial void OnGalleryDetailsUrlChanging(string value);
        partial void OnGalleryDetailsUrlChanged();
        /// <summary>
        /// 架构中不存在 Screenshots 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public global::System.Collections.ObjectModel.Collection<PublishedScreenshot> Screenshots
        {
            get
            {
                return this._Screenshots;
            }
            set
            {
                if ((value != null))
                {
                    this._Screenshots = value;
                }
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private global::System.Collections.ObjectModel.Collection<PublishedScreenshot> _Screenshots = new global::System.Collections.ObjectModel.Collection<PublishedScreenshot>();
    }
    /// <summary>
    /// 架构中不存在 Gallery.Infrastructure.FeedModels.PublishedScreenshot 的注释。
    /// </summary>
    /// <KeyProperties>
    /// Id
    /// </KeyProperties>
    [global::System.Data.Services.Common.DataServiceKeyAttribute("Id")]
    public partial class PublishedScreenshot
    {
        /// <summary>
        /// 创建新的 PublishedScreenshot 对象。
        /// </summary>
        /// <param name="ID">Id 的初始值。</param>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public static PublishedScreenshot CreatePublishedScreenshot(int ID)
        {
            PublishedScreenshot publishedScreenshot = new PublishedScreenshot();
            publishedScreenshot.Id = ID;
            return publishedScreenshot;
        }
        /// <summary>
        /// 架构中不存在属性 Id 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public int Id
        {
            get
            {
                return this._Id;
            }
            set
            {
                this.OnIdChanging(value);
                this._Id = value;
                this.OnIdChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private int _Id;
        partial void OnIdChanging(int value);
        partial void OnIdChanged();
        /// <summary>
        /// 架构中不存在属性 PublishedPackageId 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string PublishedPackageId
        {
            get
            {
                return this._PublishedPackageId;
            }
            set
            {
                this.OnPublishedPackageIdChanging(value);
                this._PublishedPackageId = value;
                this.OnPublishedPackageIdChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _PublishedPackageId;
        partial void OnPublishedPackageIdChanging(string value);
        partial void OnPublishedPackageIdChanged();
        /// <summary>
        /// 架构中不存在属性 PublishedPackageVersion 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string PublishedPackageVersion
        {
            get
            {
                return this._PublishedPackageVersion;
            }
            set
            {
                this.OnPublishedPackageVersionChanging(value);
                this._PublishedPackageVersion = value;
                this.OnPublishedPackageVersionChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _PublishedPackageVersion;
        partial void OnPublishedPackageVersionChanging(string value);
        partial void OnPublishedPackageVersionChanged();
        /// <summary>
        /// 架构中不存在属性 ScreenshotUri 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string ScreenshotUri
        {
            get
            {
                return this._ScreenshotUri;
            }
            set
            {
                this.OnScreenshotUriChanging(value);
                this._ScreenshotUri = value;
                this.OnScreenshotUriChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _ScreenshotUri;
        partial void OnScreenshotUriChanging(string value);
        partial void OnScreenshotUriChanged();
        /// <summary>
        /// 架构中不存在属性 Caption 的注释。
        /// </summary>
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        public string Caption
        {
            get
            {
                return this._Caption;
            }
            set
            {
                this.OnCaptionChanging(value);
                this._Caption = value;
                this.OnCaptionChanged();
            }
        }
        [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Data.Services.Design", "1.0.0")]
        private string _Caption;
        partial void OnCaptionChanging(string value);
        partial void OnCaptionChanged();
    }
}
