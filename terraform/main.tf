provider "aws" {
  region = "us-east-1"  # replace with your preferred region
}

data "aws_ami" "ubuntu" {
  most_recent = true
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
  owners = ["099720109477"] # Canonical
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "17.1.0"

  cluster_name    = "my-cluster"
  cluster_version = "1.20"
  subnets         = ["subnet-02972045bcbcaa2da", "subnet-0d5b74f041fe5b6b4"]
  vpc_id          = "vpc-0da5b1500edceb34d"

  node_groups = {
    eks_nodes = {
      desired_capacity = 2
      max_capacity     = 10
      min_capacity     = 1

      instance_type = "t2.micro"
      key_name      = "devops-demo"
      
      root_volume_size = 100
      root_volume_type = "gp2"

      ami_id = data.aws_ami.ubuntu.id
    }
  }
}
