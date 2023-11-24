export interface CostResponse {
  totalHourlyCost: string;
  totalMonthlyCost: string;
}

//
// {
//   "_id": "435712ea-af46-4678-8912-ef8d643f262a",
//   "result": {
//   "version": "0.2",
//     "metadata": {
//     "infracostCommand": "breakdown",
//       "vcsBranch": "",
//       "vcsCommitSha": "",
//       "vcsCommitAuthorName": "",
//       "vcsCommitAuthorEmail": "",
//       "vcsCommitTimestamp": "0001-01-01T00:00:00Z",
//       "vcsCommitMessage": ""
//   },
//   "currency": "USD",
//     "projects": [
//     {
//       "name": "/tmp/32fb9e0b-47ca-4088-a35f-faf6433a0544",
//       "metadata": {
//         "path": "/tmp/32fb9e0b-47ca-4088-a35f-faf6433a0544",
//         "type": "terraform_dir"
//       },
//       "pastBreakdown": {
//         "resources": [],
//         "totalHourlyCost": "0",
//         "totalMonthlyCost": "0"
//       },
//       "breakdown": {
//         "resources": [],
//         "totalHourlyCost": "0",
//         "totalMonthlyCost": "0"
//       },
//       "diff": {
//         "resources": [],
//         "totalHourlyCost": "0",
//         "totalMonthlyCost": "0"
//       },
//       "summary": {
//         "totalDetectedResources": 4,
//         "totalSupportedResources": 0,
//         "totalUnsupportedResources": 2,
//         "totalUsageBasedResources": 0,
//         "totalNoPriceResources": 2,
//         "unsupportedResourceCounts": {
//           "aws_ec2_instance_state": 1,
//           "aws_ecs_task_set": 1
//         },
//         "noPriceResourceCounts": {
//           "aws_iam_instance_profile": 1,
//           "aws_security_group": 1
//         }
//       }
//     }
//   ],
//     "totalHourlyCost": "0",
//     "totalMonthlyCost": "0",
//     "pastTotalHourlyCost": "0",
//     "pastTotalMonthlyCost": "0",
//     "diffTotalHourlyCost": "0",
//     "diffTotalMonthlyCost": "0",
//     "timeGenerated": "2023-11-18T08:25:49.271771352Z",
//     "summary": {
//     "totalDetectedResources": 4,
//       "totalSupportedResources": 0,
//       "totalUnsupportedResources": 2,
//       "totalUsageBasedResources": 0,
//       "totalNoPriceResources": 2,
//       "unsupportedResourceCounts": {
//       "aws_ec2_instance_state": 1,
//         "aws_ecs_task_set": 1
//     },
//     "noPriceResourceCounts": {
//       "aws_iam_instance_profile": 1,
//         "aws_security_group": 1
//     }
//   }
// }
// }
