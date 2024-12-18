-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CITIZEN', 'LAWYER', 'CLERK', 'MANAGER', 'PRESIDENT', 'ADMIN');

-- CreateTable: User
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "login" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "name" VARCHAR(250),
    "surname" VARCHAR(250),
    "email" VARCHAR(250),
    "role" "Role" NOT NULL DEFAULT 'CITIZEN',

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable: Case
CREATE TABLE "Case" (
    "case_id" SERIAL NOT NULL,
    "case_identifier" VARCHAR(255) NOT NULL,
    "case_type" VARCHAR(50) NOT NULL,
    "case_description" VARCHAR(1000) NOT NULL,
    "judge_user_id" INTEGER,
    "respondent_user_id" INTEGER,
    "clerk_user_id" INTEGER,
    "department_id" INTEGER,
    "court_id" INTEGER,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("case_id")
);

-- CreateTable: Court
CREATE TABLE "Court" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "seat" VARCHAR(255) NOT NULL,
    "court_type" VARCHAR(50) NOT NULL,
    "parent_court_id" INTEGER,
    "president_user_id" INTEGER,

    CONSTRAINT "Court_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Department
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "court_id" INTEGER NOT NULL,
    "parent_department_id" INTEGER,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable: DepartmentManager
CREATE TABLE "DepartmentManager" (
    "department_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "DepartmentManager_pkey" PRIMARY KEY ("department_id", "user_id")
);

-- CreateTable: Position
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "position_type" VARCHAR(50) NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable: CaseHistory
CREATE TABLE "CaseHistory" (
    "id" SERIAL NOT NULL,
    "case_id" INTEGER NOT NULL,
    "action" VARCHAR(1000) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CaseHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Document
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "caseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex for Document.caseId
CREATE INDEX "Document_caseId_idx" ON "Document"("caseId");

-- CreateIndex for Document.userId
CREATE INDEX "Document_userId_idx" ON "Document"("userId");

-- AddForeignKey for Document
ALTER TABLE "Document" ADD CONSTRAINT "Document_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("case_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- UpdateTable: Message
DROP TABLE IF EXISTS "Message";

CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "caseId" INTEGER NOT NULL,
    "text" VARCHAR(1000),
    "file" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex for Message.caseId
CREATE INDEX "Message_caseId_idx" ON "Message"("caseId");

-- CreateTable: CaseParty
CREATE TABLE "CaseParty" (
    "case_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "CaseParty_pkey" PRIMARY KEY ("case_id", "user_id")
);

-- AddForeignKey for Case
ALTER TABLE "Case" ADD CONSTRAINT "Case_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Case" ADD CONSTRAINT "Case_court_id_fkey" FOREIGN KEY ("court_id") REFERENCES "Court"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Case" ADD CONSTRAINT "Case_clerk_user_id_fkey" FOREIGN KEY ("clerk_user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Case" ADD CONSTRAINT "Case_judge_user_id_fkey" FOREIGN KEY ("judge_user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Case" ADD CONSTRAINT "Case_respondent_user_id_fkey" FOREIGN KEY ("respondent_user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey for Message
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Message" ADD CONSTRAINT "Message_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Message" ADD CONSTRAINT "Message_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("case_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey for CaseParty
ALTER TABLE "CaseParty" ADD CONSTRAINT "CaseParty_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "Case"("case_id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CaseParty" ADD CONSTRAINT "CaseParty_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
