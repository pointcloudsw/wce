---
title: Questions
---
#

### Is there a functional difference between the following two tag policy scope definitions?
```
> Subscription1/RG3
> Subscription1/RG3/*
```

:::note
- Applying new Policies to existing Subscriptions and existing Resource Groups do not automatically apply to pre-existing resources
- Applying new Policies to pre-existing resources requires remediation actions to be defined as part of the policy
- Whether applied directly or through a policy, Azure Resources do not inherit tags applied to their Resource Group or to their Subscription
:::


### What's the difference between azure compute gallery and azure container registry?

Azure Compute Gallery and Azure Container Registry serve different purposes within the Azure ecosystem:

#### **Azure Compute Gallery**
- **Purpose**: It helps you manage and share VM images and applications.
- **Features**:
  - **Global Replication**: Allows you to replicate images across multiple regions for high availability and disaster recovery[^1].
  - **Versioning and Grouping**: Facilitates easier management by versioning and grouping resources[^1].
  - **Sharing**: You can share resources across subscriptions, Active Directory tenants, or even publicly¹(https://learn.microsoft.com/en-us/azure/virtual-machines/azure-compute-gallery).
  - **Scaling**: Supports scaling deployments with resource replicas in each region¹(https://learn.microsoft.com/en-us/azure/virtual-machines/azure-compute-gallery).

#### **Azure Container Registry**
- **Purpose**: It is a managed Docker registry service for storing and managing container images and related artifacts.
- **Features**:
  - **Geo-Replication**: Supports global distribution and reliability for network-close deployments[^2].
  - **Integrated Authentication**: Provides secure access with integrated Azure Active Directory authentication[^2].
  - **Artifact Support**: Manages a variety of artifacts including Docker images, Helm charts, and OCI image formats[^2].
  - **Namespace Management**: Allows for organizing repositories with namespaces for better management and isolation³[^3].

In summary, **Azure Compute Gallery** is ideal for managing and sharing VM images and applications, while **Azure Container Registry** is designed for storing and managing container images and related artifacts. Both services offer robust features for replication, security, and management, but they cater to different aspects of cloud resource management.

Source: Conversation with Copilot, 10/10/2024
[^1]: [Overview of Azure Compute Gallery - Azure Virtual Machines.](https://learn.microsoft.com/en-us/azure/virtual-machines/azure-compute-gallery)
[^2]: [About Registries, Repositories, Images, and Artifacts - Azure Container Registry](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-concepts).
[^3]: [Best Practices for Using Azure Container Registry - Azure Container Registry](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-best-practices).


## Further reading

- Read [about how-to guides](https://diataxis.fr/how-to-guides/) in the Diátaxis framework
