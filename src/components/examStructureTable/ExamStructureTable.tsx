"use client";
import { Table, TableProps } from "antd";
import React from "react";

interface DataType {
  key: string;
  part: string;
  questionNumber: number;
  evaluationCriteria: string;
}

const ExamStructureTable: React.FC = () => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "パート",
      dataIndex: "part",
      key: "part",
    },
    {
      title: "問題数",
      dataIndex: "questionNumber",
      key: "questionNumber",
    },
    {
      title: "評価観点",
      dataIndex: "evaluationCriteria",
      key: "evaluationCriteria",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      part: "① ウォームアップ",
      questionNumber: 1,
      evaluationCriteria: "自己紹介・基本語彙",
    },
    {
      key: "2",
      part: "② 一問一答",
      questionNumber: 3,
      evaluationCriteria: "応答・語彙・自然さ",
    },
    {
      key: "3",
      part: "③ ロールプレイ",
      questionNumber: 1,
      evaluationCriteria: "対話力・表現・丁寧さ",
    },
    {
      key: "4",
      part: "④ 音読",
      questionNumber: 2,
      evaluationCriteria: "発音・イントネーション",
    },
    {
      key: "5",
      part: "⑤ 意見表明",
      questionNumber: 1,
      evaluationCriteria: "構成力・論理性・語彙",
    },
  ];

  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      pagination={false}
      components={{
        body: {
          cell: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
            <td {...props} className="font-japaneseSans text-header-table" />
          ),
        },
        header: {
          cell: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
            <th {...props} className="font-japaneseSans text-body-table" />
          ),
        },
      }}
    />
  );
};

export default ExamStructureTable;
